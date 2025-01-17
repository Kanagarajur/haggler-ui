export const environment = {
  production: false,
  baseUrl:'https://haggler-api-tst.uc.r.appspot.com/haggler/',
  login:'business/validateuser',
  register:'business/register',
  regConfirm: 'business/register/:token',
  getDeals: 'listdeals?page=:page&limit=:limit&sort=:sort&dir=:dir',
  saveDeals:'createdeal',
  getCatgories:'categories/list',
  getSubCatgories:'category/:category',
  getProfile:'business/:emailaddress',
  updateProfile: 'business/updateprofile',
  deleteDeal:'delete/:dealId',
  getDeal: 'getdeal/:dealId',
  businessProfile: 'business/details/:businessID',
  getAllBusiness:'business/list?page=:page&limit=:limit&sort=:sort&dir=:dir',
  businessImageUpload: 'images/uploadb64',
  businessImage: 'images/:imageId',
  toggleDeal: 'deal/:status',
  chatAgentId:'37c7a150-bf2b-4cb0-bcfa-5dbd97197611',
  chatIconUrl:'https://haggler-uat.uc.r.appspot.com/assets/images/hagglr-ai.png',
  saveContacts: 'contacts',
  getContacts: 'contacts/list',
  saveComments:'contacts/:Id',
  paypalAuth:'Basic QVlaY2ZIVG4zbHVpX1F2WGstZ0F6SnB3dDNsN3FkdFItWU14aEJ4ckNsZnByX01JRVZuX1pjV1FvZUVBeHlFaWNlTTdJdG5MU3NuSFUwcHQ6RU1mcTVtY043VGlNME5kOHRxS2pVMmF6U01YcmxMT0ZMY0d6aHVpcUtPN1M4SDBhLW1TSkJDQUhkRzhOdk5rRTR1a3hUdkhtYUFMcWRUMWY=', // LIVE AUTH
  paypalFreePlanID:'P-24041208RB733783TL56APHQ',
  paypalPremiumPlanID:'P-6MB05727FC981221PL4QT2UA',
  updatePayPal:'payments',
  paypalSubscripURL:'https://api.paypal.com/v1/billing/subscriptions/', // LIVE URL
  socialMediaLogin:'business/socialLogin'
};
