// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://haggler-api-tst.uc.r.appspot.com/haggler/',
  login: 'business/validateuser',
  register: 'business/register',
  regConfirm: 'business/register/:token',
  getDeals: 'listdeals?page=:page&limit=:limit&sort=:sort&dir=:dir',
  saveDeals: 'createdeal',
  getCatgories: 'categories/list',
  getSubCatgories: 'category/:category',
  getProfile: 'business/:emailaddress',
  updateProfile: 'business/updateprofile',
  deleteDeal: 'delete/:dealId',
  getDeal: 'getdeal/:dealId',
  businessProfile: 'business/details/:businessID',
  getAllBusiness:'business/list?page=:page&limit=:limit&sort=:sort&dir=:dir',
  businessImageUpload: 'images/uploadb64',
  businessImage: 'images/:imageId',
  toggleDeal: 'deal/:status',
  saveContacts: 'contacts',
  getContacts: 'contacts/list',
  saveComments:'contacts/:Id',
  paypalAuth:'Basic QVlaY2ZIVG4zbHVpX1F2WGstZ0F6SnB3dDNsN3FkdFItWU14aEJ4ckNsZnByX01JRVZuX1pjV1FvZUVBeHlFaWNlTTdJdG5MU3NuSFUwcHQ6RU1mcTVtY043VGlNME5kOHRxS2pVMmF6U01YcmxMT0ZMY0d6aHVpcUtPN1M4SDBhLW1TSkJDQUhkRzhOdk5rRTR1a3hUdkhtYUFMcWRUMWY=',
  paypalFreePlanID:'P-24041208RB733783TL56APHQ',
  paypalPremiumPlanID:'P-6MB05727FC981221PL4QT2UA',
  updatePayPal:'payments',
  paypalSubscripURL:'https://api.paypal.com/v1/billing/subscriptions/',
  socialMediaLogin:'business/socialLogin',

  
  apiUrl: "http://localhost:4200",
  facebookAppId: "3819439784750389"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
