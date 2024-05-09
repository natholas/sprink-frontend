import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginResolve } from './login.resolve';
import { LoggedInResolve } from './resolves/loggedin.resolve';
import { HomeComponent } from './pages/home/home.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { NewOrderResolve } from './resolves/new-order.resolve';
import { OverviewComponent } from './pages/overview/overview.component';
import { OverviewResolve } from './resolves/overview.resolve';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';
import { ShopAdminComponent } from './pages/shop-admin/shop-admin.component';
import { ShopAdminResolve } from './resolves/shop-admin.resolve';
import { NotSupportedComponent } from './pages/not-supported/not-supported.component';
import { ShopOrderComponent } from './pages/shop-order/shop-order.component';
import { OrderResolve } from './resolves/order.resolve';
import { PickupOrderComponent } from './pages/pickup-order/pickup-order.component';
import { PickupOrderResolve } from './resolves/pickup-order.resolve';
import { DeliverOrderComponent } from './pages/deliver-order/deliver-order.component';
import { DeliverOrderResolve } from './resolves/deliver-order.resolve';
import { DashboardResolve } from './resolves/dashboard.resolve';
import { ShopSettingsComponent } from './pages/shop-settings/shop-settings.component';
import { ShopGeneralSettingsComponent } from './pages/shop-general-settings/shop-general-settings.component';
import { ShopProductSettingsComponent } from './pages/shop-product-settings/shop-product-settings.component';
import { ShopTimesSettingsComponent } from './pages/shop-times-settings/shop-times-settings.component';
import { CustomerSettingsComponent } from './pages/customer-settings/customer-settings.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { ConfirmPaymentMethodResolve } from './resolves/confirm-payment-method-resolve';
import { PaymentMethodsResolve } from './resolves/payment-methods.resolve';
import { ContactComponent } from './pages/contact/contact.component';
import { SendPasswordResetEmailComponent } from './pages/send-password-reset-email/send-password-reset-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContinueComponent } from './pages/continue/continue.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';
import { CustomerOrdersResolve } from './resolves/customer-orders.resolve';
import { CustomerOrderDetailsComponent } from './pages/customer-order-details/customer-order-details.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { VerifyEmailResolve } from './resolves/verify-email.resolve';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmEmailResolve } from './resolves/confirm-email.resolve';
import { ShopOrdersComponent } from './pages/shop-orders/shop-orders.component';
import { ShopOrdersResolve } from './resolves/shop-orders.resolve';
import { BecomeAPartnerComponent } from './pages/become-a-partner/become-a-partner.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ShopSetupResolve } from './resolves/shop-setup.resolve';
import { ShopSetupComponent } from './pages/shop-setup/shop-setup.component';
import { ShopSettingsResolve } from './resolves/shop-settings.resolve';
import { ShopVerificationDocumentsComponent } from './pages/shop-verification-documents/shop-verification-documents.component';
import { SecuritySettingsComponent } from './pages/security-settings/security-settings.component';
import { TwoFactorCodeEntryComponent } from './pages/two-factor-code-entry/two-factor-code-entry.component';
import { SuperAdminDashboardComponent } from './pages/super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminDashboardResolve } from './resolves/super-admin-dashboard.resolve';
import { SuperAdminUserComponent } from './pages/super-admin-user/super-admin-user.component';
import { SuperAdminUserResolve } from './resolves/super-admin-user.resolve';
import { BubbleScreenComponent } from './pages/bubble-screen/bubble-screen.component';
import { SuperAdminUsersComponent } from './pages/super-admin-users/super-admin-users.component';
import { SuperAdminOrdersComponent } from './pages/super-admin-orders/super-admin-orders.component';
import { SuperAdminShopsComponent } from './pages/super-admin-shops/super-admin-shops.component';
import { SuperAdminUsersResolve } from './resolves/super-admin-users.resolve';
import { SuperAdminOrdersResolve } from './resolves/super-admin-orders.resolve';
import { SuperAdminShopsResolve } from './resolves/super-admin-shops.resolve';
import { SuperAdminShopResolve } from './resolves/super-admin-shop.resolve';
import { SuperAdminShopComponent } from './pages/super-admin-shop/super-admin-shop.component';
import { FirstShopOpeningComponent } from './pages/first-shop-opening/first-shop-opening.component';
import { ShopOpeningResolve } from './resolves/shop-opening.resolve';
import { ShopUsersSettingsComponent } from './pages/shop-users-settings/shop-users-settings.component';
import { ShopUsersSettingsResolve } from './resolves/shop-users-settings.resolve';
import { ShopInvitesComponent } from './pages/shop-invites/shop-invites.component';
import { AcceptShopInviteResolve } from './resolves/accept-shop-invite.resolve';
import { NeighbouringShopsResolve } from './resolves/neighbouring-shops.resolve';
import { ShopPayoutSettingsComponent } from './pages/shop-payout-settings/shop-payout-settings.component';
import { ShopPayoutResolve } from './resolves/shop-payout-settings.resolve';
import { SuperAdminShopPayoutsComponent } from './pages/super-admin-shop-payouts/super-admin-shop-payouts.component';
import { SuperAdminShopPayoutsResolve } from './resolves/super-admin-shop-payouts.resolve';
import { SuperAdminDoShopPayoutComponent } from './pages/super-admin-do-shop-payout/super-admin-do-shop-payout.component';
import { SuperAdminDoShopPayoutResolve } from './resolves/super-admin-do-shop-payout.resolve';
import { ShopPayoutsComponent } from './pages/shop-payouts/shop-payouts.component';
import { ShopPayoutsResolve } from './resolves/shop-payouts.resolve';
import { SuperAdminShopPayoutComponent } from './pages/super-admin-shop-payout/super-admin-shop-payout.component';
import { SuperAdminShopPayoutResolve } from './resolves/super-admin-shop-payout.resolve';
import { GdprComponent } from './pages/gdpr/gdpr.component';
import { BecomeAPartnerSuccessComponent } from './pages/become-a-partner-success/become-a-partner-success.component';
import { CollectOrderComponent } from './pages/collect-order/collect-order.component';
import { CollectOrderResolve } from './resolves/collect-order.resolve';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { UnsubscribeComponent } from './pages/unsubscribe/unsubscribe.component';
import { UnsubscribeResolve } from './resolves/unsubscribe.resolve';
import { SuperAdminCampaignsComponent } from './pages/super-admin-campaigns/super-admin-campaigns.component';
import { SuperAdminCampaignsResolve } from './resolves/super-admin-campaigns.resolve';
import { ShopVerificationsResolve } from './resolves/shop-verifications-resolve';
import { SprinkCreditSettingsComponent } from './pages/sprink-credit-settings/sprink-credit-settings.component';
import { ReferralsComponent } from './pages/referrals/referrals.component';
import { ReferralsResolve } from './resolves/referrals.resolve';
import { ServiceProviderTermsComponent } from './pages/service-provider-terms/service-provider-terms.component';
import { NotSupportedNewComponent } from './pages/not-supported-new/not-supported-new.component';
import { PayoutsExplainedComponent } from './pages/payouts-explained/payouts-explained.component';
import { ShopFaqsComponent } from './pages/shop-faqs/shop-faqs.component';
import { SuperAdminPromotionsComponent } from './pages/super-admin-promotions/super-admin-promotions.component';
import { SuperAdminPromotionsResolve } from './resolves/super-admin-promotions-resolve';
import { DefaultPromoResolve } from './resolves/default-promo.resolve';
import { AutoShopRedirectResolve } from './resolves/auto-shop-redirect.resolve';
import { ShopMarketingSettingsComponent } from './pages/shop-marketing-settings/shop-marketing-settings.component';
import { ShopSelectionComponent } from './pages/shop-selection/shop-selection.component';
import { ShopSelectionResolve } from './resolves/shop-selection.resolve';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { promotion: DefaultPromoResolve, autoShop: AutoShopRedirectResolve }
  },
  {
    path: 'get-started', // please never delete this route, it is used for linking from shop website
    component: HomeComponent,
    resolve: { promotion: DefaultPromoResolve }
  },
  {
    path: 'code/:shopName',
    component: HomeComponent,
    resolve: { promotion: DefaultPromoResolve }
  },
  {
    path: 'become-a-partner',
    component: BecomeAPartnerComponent
  },
  {
    path: 'payouts-explained',
    component: PayoutsExplainedComponent
  },
  {
    path: 'shop-faqs',
    component: ShopFaqsComponent
  },
  {
    path: 'become-a-partner/:code',
    component: BecomeAPartnerComponent
  },
  {
    path: 'invited',
    redirectTo: '/become-a-partner/invited'
  },
  {
    path: 'invited-facebook',
    redirectTo: '/become-a-partner/invited?utm_source=facebook&utm_medium=advert&utm_campaign=shop%20campaign%202'
  },
  {
    path: 'become-a-partner-success',
    component: BecomeAPartnerSuccessComponent
  },
  {
    path: 'join',
    redirectTo: '/become-a-partner'
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { loggedin: LoginResolve }
  },
  {
    path: 'two-factor-code-entry/:token',
    component: TwoFactorCodeEntryComponent,
    resolve: { loggedin: LoginResolve }
  },
  {
    path: 'send-password-reset-email',
    component: SendPasswordResetEmailComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'continue',
    component: ContinueComponent,
    resolve: { loggedin: LoginResolve }
  },
  {
    path: 'c',
    redirectTo: '/continue',
  },
  {
    path: 'facebook-login-redirect',
    component: ContinueComponent,
    resolve: { loggedin: LoginResolve }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { orders: DashboardResolve }
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    resolve: { loggedin: VerifyEmailResolve }
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    resolve: { confirmed: ConfirmEmailResolve }
  },
  {
    path: 'support',
    component: ContactComponent
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
    resolve: { resp: UnsubscribeResolve }
  },
  {
    path: 'bubbles',
    component: BubbleScreenComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'confirm-shop-invite-acceptance/:id',
    component: ShopInvitesComponent,
    resolve: { invites: AcceptShopInviteResolve }
  },
  {
    path: 'settings',
    component: CustomerSettingsComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'settings/personal-details',
    component: PersonalDetailsComponent,
    resolve: { loggedin: LoggedInResolve },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'settings/security',
    component: SecuritySettingsComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'settings/payment-methods',
    component: PaymentMethodsComponent,
    resolve: { paymentMethods: PaymentMethodsResolve }
  },
  {
    path: 'confirm-payment-method',
    component: ConfirmPaymentComponent,
    resolve: { data: ConfirmPaymentMethodResolve }
  },
  {
    path: 'settings/gdpr',
    component: GdprComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'settings/sprink-credit',
    component: SprinkCreditSettingsComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'settings/referrals',
    component: ReferralsComponent,
    resolve: { loggedin: LoggedInResolve, referrals: ReferralsResolve }
  },
  {
    path: 'selection',
    component: ShopSelectionComponent,
    resolve: { shops: ShopSelectionResolve }
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    resolve: { data: NewOrderResolve },
    canDeactivate: [CanDeactivateGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'new-order-guest',
    component: NewOrderComponent,
    resolve: { data: NewOrderResolve },
    canDeactivate: [CanDeactivateGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'new-order-preview',
    component: NewOrderComponent,
    resolve: { data: NewOrderResolve },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: { data: OverviewResolve }
  },
  {
    path: 'confirmation/:orderId',
    component: ConfirmationComponent,
    resolve: { order: OrderResolve }
  },
  {
    path: 'orders',
    component: CustomerOrdersComponent,
    resolve: { orders: CustomerOrdersResolve }
  },
  {
    path: 'order-details/:orderId',
    component: CustomerOrderDetailsComponent,
    resolve: { order: OrderResolve }
  },
  {
    path: 'shop-admin',
    component: ShopAdminComponent,
    resolve: { shop: ShopAdminResolve }
  },
  {
    path: 'shop-payouts',
    component: ShopPayoutsComponent,
    resolve: { data: ShopPayoutsResolve }
  },
  {
    path: 'no-shops',
    component: NotSupportedComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'account-created-no-shops',
    component: NotSupportedNewComponent,
    resolve: { loggedin: LoggedInResolve }
  },
  {
    path: 'shop-orders',
    component: ShopOrdersComponent,
    resolve: { orders: ShopOrdersResolve }
  },
  {
    path: 'shop-order/:orderId',
    component: ShopOrderComponent,
    resolve: { order: OrderResolve }
  },
  {
    path: 'pickup-order/:orderId',
    component: PickupOrderComponent,
    resolve: { data: PickupOrderResolve }
  },
  {
    path: 'deliver-order/:orderId',
    component: DeliverOrderComponent,
    resolve: { order: DeliverOrderResolve }
  },
  {
    path: 'collect-order/:orderId',
    component: CollectOrderComponent,
    resolve: { order: CollectOrderResolve }
  },
  {
    path: 'shop-settings/:id',
    component: ShopSettingsComponent,
    resolve: { shop: ShopAdminResolve }
  },
  {
    path: 'shop-opening',
    component: FirstShopOpeningComponent,
    resolve: { shop: ShopOpeningResolve }
  },
  {
    path: 'shop-settings',
    component: ShopSettingsComponent,
    resolve: { shop: ShopAdminResolve }
  },
  {
    path: 'shop-settings/general/:id',
    component: ShopGeneralSettingsComponent,
    resolve: { shop: ShopSettingsResolve },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'shop-settings/products/:id',
    component: ShopProductSettingsComponent,
    resolve: { shop: ShopSettingsResolve },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'shop-settings/users/:id',
    component: ShopUsersSettingsComponent,
    resolve: { data: ShopUsersSettingsResolve }
  },
  {
    path: 'shop-settings/times/:id',
    component: ShopTimesSettingsComponent,
    resolve: { shop: ShopSettingsResolve, neighbouringShops: NeighbouringShopsResolve },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'shop-settings/payout/:id',
    component: ShopPayoutSettingsComponent,
    resolve: { shop: ShopSettingsResolve, payoutSettings: ShopPayoutResolve },
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'shop-settings/marketing/:id',
    component: ShopMarketingSettingsComponent,
    resolve: { shop: ShopSettingsResolve }
  },
  {
    path: 'shop-setup',
    component: ShopSetupComponent,
    resolve: { shop: ShopSetupResolve, payoutSettings: ShopPayoutResolve }
  },
  {
    path: 'shop-verification-documents',
    component: ShopVerificationDocumentsComponent,
    resolve: { shop: ShopSetupResolve, verificationRequests: ShopVerificationsResolve }
  },
  {
    path: 'super-admin-dashboard',
    component: SuperAdminDashboardComponent,
    resolve: { data: SuperAdminDashboardResolve }
  },
  {
    path: 'super-admin-users',
    component: SuperAdminUsersComponent,
    resolve: { users: SuperAdminUsersResolve }
  },
  {
    path: 'super-admin-promotions',
    component: SuperAdminPromotionsComponent,
    resolve: { promotions: SuperAdminPromotionsResolve }
  },
  {
    path: 'super-admin-orders',
    component: SuperAdminOrdersComponent,
    resolve: { orders: SuperAdminOrdersResolve }
  },
  {
    path: 'super-admin-shops',
    component: SuperAdminShopsComponent,
    resolve: { shops: SuperAdminShopsResolve }
  },
  {
    path: 'super-admin-shops/hidden',
    component: SuperAdminShopsComponent,
    resolve: { shops: SuperAdminShopsResolve }
  },
  {
    path: 'super-admin-shop-payouts',
    component: SuperAdminShopPayoutsComponent,
    resolve: { data: SuperAdminShopPayoutsResolve }
  },
  {
    path: 'super-admin-do-shop-payout/:id',
    component: SuperAdminDoShopPayoutComponent,
    resolve: { payout: SuperAdminDoShopPayoutResolve }
  },
  {
    path: 'super-admin-shop-payout/:id',
    component: SuperAdminShopPayoutComponent,
    resolve: { payout: SuperAdminShopPayoutResolve }
  },
  {
    path: 'super-admin-shop/:id',
    component: SuperAdminShopComponent,
    resolve: { data: SuperAdminShopResolve }
  },
  {
    path: 'super-admin-user/:id',
    component: SuperAdminUserComponent,
    resolve: { data: SuperAdminUserResolve }
  },
  {
    path: 'super-admin-campaigns',
    component: SuperAdminCampaignsComponent,
    resolve: { data: SuperAdminCampaignsResolve }
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'service-provider-terms',
    component: ServiceProviderTermsComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'help',
    component: HelpPageComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
