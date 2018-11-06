/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: async function (done) {

      sails.log.info('Initializing hook... (`api/hooks/custom`)');

      // Check Stripe/Mailgun configuration (for billing and emails).
      var IMPORTANT_STRIPE_CONFIG = ['stripeSecret', 'stripePublishableKey'];
      var IMPORTANT_MAILGUN_CONFIG = ['mailgunSecret', 'mailgunDomain', 'internalEmailAddress'];
      var isMissingStripeConfig = _.difference(IMPORTANT_STRIPE_CONFIG, Object.keys(sails.config.custom)).length > 0;
      var isMissingMailgunConfig = _.difference(IMPORTANT_MAILGUN_CONFIG, Object.keys(sails.config.custom)).length > 0;

      if (isMissingStripeConfig || isMissingMailgunConfig) {

        let missingFeatureText = isMissingStripeConfig && isMissingMailgunConfig ? 'billing and email' : isMissingStripeConfig ? 'billing' : 'email';
        let suffix = '';
        if (_.contains(['silly'], sails.config.log.level)) {
          suffix =
`
> Tip: To exclude sensitive credentials from source control, use:
> • config/local.js (for local development)
> • environment variables (for production)
>
> If you want to check them in to source control, use:
> • config/custom.js  (for development)
> • config/env/staging.js  (for staging)
> • config/env/production.js  (for production)
>
> (See https://sailsjs.com/docs/concepts/configuration for help configuring Sails.)
`;
        }

        let problems = [];
        if (sails.config.custom.stripeSecret === undefined) {
          problems.push('No `sails.config.custom.stripeSecret` was configured.');
        }
        if (sails.config.custom.stripePublishableKey === undefined) {
          problems.push('No `sails.config.custom.stripePublishableKey` was configured.');
        }
        if (sails.config.custom.mailgunSecret === undefined) {
          problems.push('No `sails.config.custom.mailgunSecret` was configured.');
        }
        if (sails.config.custom.mailgunDomain === undefined) {
          problems.push('No `sails.config.custom.mailgunDomain` was configured.');
        }
        if (sails.config.custom.internalEmailAddress === undefined) {
          problems.push('No `sails.config.custom.internalEmailAddress` was configured.');
        }

        sails.log.verbose(
`Some optional settings have not been configured yet:
---------------------------------------------------------------------
${problems.join('\n')}

Until this is addressed, this app's ${missingFeatureText} features
will be disabled and/or hidden in the UI.

 [?] If you're unsure or need advice, come by https://sailsjs.com/support
---------------------------------------------------------------------${suffix}`);
      }//ﬁ

      // Set an additional config keys based on whether Stripe config is available.
      // This will determine whether or not to enable various billing features.
      sails.config.custom.enableBillingFeatures = !isMissingStripeConfig;

      // After "sails-hook-organics" finishes initializing, configure Stripe
      // and Mailgun packs with any available credentials.
      sails.after('hook:organics:loaded', ()=>{

        sails.helpers.stripe.configure({
          secret: sails.config.custom.stripeSecret
        });

        sails.helpers.mailgun.configure({
          secret: sails.config.custom.mailgunSecret,
          domain: sails.config.custom.mailgunDomain,
          from: sails.config.custom.fromEmailAddress,
          fromName: sails.config.custom.fromName,
        });

      });//_∏_

      // ... Any other app-specific setup code that needs to run on lift,
      // even in production, goes here ...

      return done();

    },


    routes: {

      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        '/*': {
          skipAssets: true,
          fn: async function(req, res, next){

            var url = require('url');

            // First, if this is a GET request (and thus potentially a view),
            // attach a couple of guaranteed locals.
            if (req.method === 'GET') {

              // The  `_environment` local lets us do a little workaround to make Vue.js
              // run in "production mode" without unnecessarily involving complexities
              // with webpack et al.)
              if (res.locals._environment !== undefined) {
                throw new Error('Cannot attach Sails environment as the view local `_environment`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals._environment = sails.config.environment;

              // The `me` local is set explicitly to `undefined` here just to avoid having to
              // do `typeof me !== 'undefined'` checks in our views/layouts/partials.
              // > Note that, depending on the request, this may or may not be set to the
              // > logged-in Player record further below.
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals.me = undefined;
            }//ﬁ

            // Next, if we're running in our actual "production" or "staging" Sails
            // environment, check if this is a GET request via some other subdomain,
            // for example something like `webhooks.` or `click.`.  If so, we'll
            // automatically go ahead and redirect to the corresponding path under
            // our base URL, which is environment-specific.
            // > Note that we DO NOT redirect virtual socket requests and we DO NOT
            // > redirect non-GET requests (because it can confuse some 3rd party
            // > platforms that send webhook requests.)
            var configuredBaseSubdomain;
            try {
              configuredBaseSubdomain = url.parse(sails.config.custom.baseUrl).host.match(/^([^\.]+)\./)[1];
            } catch (unusedErr) { /*…*/}
            if ((sails.config.environment === 'staging' || sails.config.environment === 'production') && !req.isSocket && req.method === 'GET' && req.subdomains[0] !== configuredBaseSubdomain) {
              sails.log.info('Redirecting GET request from `'+req.subdomains[0]+'.` subdomain...');
              return res.redirect(sails.config.custom.baseUrl+req.url);
            }//•

            // No session? Proceed as usual.
            // (e.g. request for a static asset)
            if (!req.session) { return next(); }

            // Not logged in? Proceed as usual.
            if (!req.session.PlayerId) { return next(); }

            // Otherwise, look up the logged-in Player.
            var loggedInPlayer = await Player.findOne({
              id: req.session.PlayerId
            });

            // If the logged-in Player has gone missing, log a warning,
            // wipe the Player id from the requesting Player agent's session,
            // and then send the "unauthorized" response.
            if (!loggedInPlayer) {
              sails.log.warn('Somehow, the Player record for the logged-in Player (`'+req.session.PlayerId+'`) has gone missing....');
              delete req.session.PlayerId;
              return res.unauthorized();
            }

            // Add additional information for convenience when building top-level navigation.
            // (i.e. whether to display "Dashboard", "My Account", etc.)
            if (!loggedInPlayer.password || loggedInPlayer.emailStatus === 'unconfirmed') {
              loggedInPlayer.dontDisplayAccountLinkInNav = true;
            }

            // Expose the Player record as an extra property on the request object (`req.me`).
            // > Note that we make sure `req.me` doesn't already exist first.
            if (req.me !== undefined) {
              throw new Error('Cannot attach logged-in Player as `req.me` because this property already exists!  (Is it being attached somewhere else?)');
            }
            req.me = loggedInPlayer;

            // If our "lastSeenAt" attribute for this Player is at least a few seconds old, then set it
            // to the current timestamp.
            //
            // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
            var MS_TO_BUFFER = 60*1000;
            var now = Date.now();
            if (loggedInPlayer.lastSeenAt < now - MS_TO_BUFFER) {
              Player.update({id: loggedInPlayer.id})
              .set({ lastSeenAt: now })
              .exec((err)=>{
                if (err) {
                  sails.log.error('Background task failed: Could not update Player (`'+loggedInPlayer.id+'`) with a new `lastSeenAt` timestamp.  Error details: '+err.stack);
                  return;
                }//•
                sails.log.verbose('Updated the `lastSeenAt` timestamp for Player `'+loggedInPlayer.id+'`.');
                // Nothing else to do here.
              });//_∏_  (Meanwhile...)
            }//ﬁ


            // If this is a GET request, then also expose an extra view local (`<%= me %>`).
            // > Note that we make sure a local named `me` doesn't already exist first.
            // > Also note that we strip off any properties that correspond with protected attributes.
            if (req.method === 'GET') {
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach logged-in Player as the view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }

              // Exclude any fields corresponding with attributes that have `protect: true`.
              var sanitizedPlayer = _.extend({}, loggedInPlayer);
              for (let attrName in Player.attributes) {
                if (Player.attributes[attrName].protect) {
                  delete sanitizedPlayer[attrName];
                }
              }//∞

              // If there is still a "password" in sanitized Player data, then delete it just to be safe.
              // (But also log a warning so this isn't hopelessly confusing.)
              if (sanitizedPlayer.password) {
                sails.log.warn('The logged in Player record has a `password` property, but it was still there after pruning off all properties that match `protect: true` attributes in the Player model.  So, just to be safe, removing the `password` property anyway...');
                delete sanitizedPlayer.password;
              }//ﬁ

              res.locals.me = sanitizedPlayer;

              // Include information on the locals as to whether billing features
              // are enabled for this app, and whether email verification is required.
              res.locals.isBillingEnabled = sails.config.custom.enableBillingFeatures;
              res.locals.isEmailVerificationRequired = sails.config.custom.verifyEmailAddresses;

            }//ﬁ

            // Prevent the browser from caching logged-in Players' pages.
            // (including w/ the Chrome back button)
            // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
            // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            res.setHeader('Cache-Control', 'no-cache, no-store');

            return next();
          }
        }
      }
    }


  };

};