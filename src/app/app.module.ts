import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';
import { ShopAdminComponent } from './pages/shop-admin/shop-admin.component';
import { NotSupportedComponent } from './pages/not-supported/not-supported.component';
import { ShopOrderComponent } from './pages/shop-order/shop-order.component';
import { PickupOrderComponent } from './pages/pickup-order/pickup-order.component';
import { DeliverOrderComponent } from './pages/deliver-order/deliver-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { ToUrlPipe } from './pipes/to-url.pipe';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShopGeneralSettingsComponent } from './pages/shop-general-settings/shop-general-settings.component';
import { ShopSettingsComponent } from './pages/shop-settings/shop-settings.component';
import { ShopProductSettingsComponent } from './pages/shop-product-settings/shop-product-settings.component';
import { ShopTimesSettingsComponent } from './pages/shop-times-settings/shop-times-settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { IconSelectionComponent } from './components/icon-selection/icon-selection.component';
import { RefundOrderComponent } from './components/refund-order/refund-order.component';
import { CustomerSettingsComponent } from './pages/customer-settings/customer-settings.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { PaddToPipe } from './pipes/padd-to.pipe';
import { PaymentMethodSelectionSheetComponent } from './components/payment-method-selection-sheet/payment-method-selection-sheet.component';
import { ShopInfoDialogComponent } from './components/shop-info-dialog/shop-info-dialog.component';
import { ShopOrderCommentComponent } from './components/shop-order-comment/shop-order-comment.component';
import { AddressComponent } from './components/address/address.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EditPromotionComponent } from './components/edit-promotion/edit-promotion.component';
import { BubblesComponent } from './components/bubbles/bubbles.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SendPasswordResetEmailComponent } from './pages/send-password-reset-email/send-password-reset-email.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContinueComponent } from './pages/continue/continue.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CustomerOrdersComponent } from './pages/customer-orders/customer-orders.component';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { CustomerOrderComponent } from './pages/customer-order/customer-order.component';
import { CustomerOrderDetailsComponent } from './pages/customer-order-details/customer-order-details.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ShopOrdersComponent } from './pages/shop-orders/shop-orders.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InstallBannerComponent } from './components/install-banner/install-banner.component';
import { OrderPricingDetailsComponent } from './components/order-pricing-details/order-pricing-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("761576079915-33bepstmccdvatfqefg86gualc04gthr.apps.googleusercontent.com") // XHRHtmeLaN8wd1DDBpQ6t5Gm
  }
]);

import { registerLocaleData } from '@angular/common';
import localeGb from '@angular/common/locales/en-GB';
import { BecomeAPartnerBannerComponent } from './components/become-a-partner-banner/become-a-partner-banner.component';
import { BecomeAPartnerComponent } from './pages/become-a-partner/become-a-partner.component';
import { PartnerFormComponent } from './components/partner-form/partner-form.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { ShopSetupComponent } from './pages/shop-setup/shop-setup.component';
import { ShopVerificationDocumentsComponent } from './pages/shop-verification-documents/shop-verification-documents.component';
import { SecuritySettingsComponent } from './pages/security-settings/security-settings.component';
import { TwoFactorCodeEntryComponent } from './pages/two-factor-code-entry/two-factor-code-entry.component';
import { SuperAdminDashboardComponent } from './pages/super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminUsersComponent } from './pages/super-admin-users/super-admin-users.component';
import { SuperAdminShopsComponent } from './pages/super-admin-shops/super-admin-shops.component';
import { SuperAdminOrdersComponent } from './pages/super-admin-orders/super-admin-orders.component';
import { SuperAdminUserComponent } from './pages/super-admin-user/super-admin-user.component';
import { BubbleScreenComponent } from './pages/bubble-screen/bubble-screen.component';
import { NumberRoundingPipe } from './pipes/number-rounding.pipe';
import { SuperAdminShopComponent } from './pages/super-admin-shop/super-admin-shop.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { EditProductGroupDialogComponent } from './components/edit-product-group-dialog/edit-product-group-dialog.component';
import { FirstShopOpeningComponent } from './pages/first-shop-opening/first-shop-opening.component';
import { ShopUsersSettingsComponent } from './pages/shop-users-settings/shop-users-settings.component';
import { ShopInvitesComponent } from './pages/shop-invites/shop-invites.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { ShopsMapComponent } from './components/shops-map/shops-map.component';
import { ShopNeighboursMapDialogComponent } from './components/shop-neighbours-map-dialog/shop-neighbours-map-dialog.component';
import { SuperAdminDoShopPayoutComponent } from './pages/super-admin-do-shop-payout/super-admin-do-shop-payout.component';
import { ShopPayoutSettingsComponent } from './pages/shop-payout-settings/shop-payout-settings.component';
import { SuperAdminShopPayoutsComponent } from './pages/super-admin-shop-payouts/super-admin-shop-payouts.component';
import { ShopPayoutsComponent } from './pages/shop-payouts/shop-payouts.component';
import { SuperAdminShopPayoutComponent } from './pages/super-admin-shop-payout/super-admin-shop-payout.component';
import { GdprComponent } from './pages/gdpr/gdpr.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { BecomeAPartnerSuccessComponent } from './pages/become-a-partner-success/become-a-partner-success.component';
import { CollectOrderComponent } from './pages/collect-order/collect-order.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { SprinkyOnBikeComponent } from './components/sprinky-on-bike/sprinky-on-bike.component';
import { ScrollIndicatorComponent } from './components/scroll-indicator/scroll-indicator.component';
import { UnsubscribeComponent } from './pages/unsubscribe/unsubscribe.component';
import { SuperAdminCampaignsComponent } from './pages/super-admin-campaigns/super-admin-campaigns.component';
import { NumberLimitDirective } from './number-limit.directive';
import { OrderHelpDialogComponent } from './components/order-help-dialog/order-help-dialog.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { SprinkCreditSettingsComponent } from './pages/sprink-credit-settings/sprink-credit-settings.component';
import { ReferralsComponent } from './pages/referrals/referrals.component';
import { CantChargeExtraDialogComponent } from './components/cant-charge-extra-dialog/cant-charge-extra-dialog.component';
import { RequestNotificationBoxComponent } from './request-notification-box/request-notification-box.component';
import { PayoutDetailsDialogComponent } from './payout-details-dialog/payout-details-dialog.component';
import { ServiceProviderTermsComponent } from './pages/service-provider-terms/service-provider-terms.component';
import { NotSupportedNewComponent } from './pages/not-supported-new/not-supported-new.component';
import { ReferralAdComponent } from './components/referral-ad/referral-ad.component';
import { PayoutsExplainedComponent } from './pages/payouts-explained/payouts-explained.component';
import { ShopFaqsComponent } from './pages/shop-faqs/shop-faqs.component';
import { ProductsImportPreviewDialogComponent } from './components/products-import-preview-dialog/products-import-preview-dialog.component';
import { PostcodeSearchComponent } from './components/postcode-search/postcode-search.component';
import { SuperAdminPromotionsComponent } from './pages/super-admin-promotions/super-admin-promotions.component';
import { ProductParentSelectionDialogComponent } from './components/product-parent-selection-dialog/product-parent-selection-dialog.component';
import { ProductSelectionDialogComponent } from './components/product-selection-dialog/product-selection-dialog.component';
import { ProductAmountSelectionDialogComponent } from './components/product-amount-selection-dialog/product-amount-selection-dialog.component';
import { CheckoutProductSelectionComponent } from './components/checkout-product-selection/checkout-product-selection.component';
import { PickupAddProductDialogComponent } from './components/pickup-add-product-dialog/pickup-add-product-dialog.component';
import { SortByPipe } from './sort-by.pipe';
import { IntroAnimationComponent } from './intro-animation/intro-animation.component';
import { ShopMarketingSettingsComponent } from './pages/shop-marketing-settings/shop-marketing-settings.component';
import { NewOrderSignupComponent } from './components/new-order-signup/new-order-signup.component';
import { ShopSelectionComponent } from './pages/shop-selection/shop-selection.component';
import { SelectionShopInfoDialogComponent } from './components/selection-shop-info-dialog/selection-shop-info-dialog.component';

registerLocaleData(localeGb, 'en-GB');

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    PersonalDetailsComponent,
    NewOrderComponent,
    OverviewComponent,
    ConfirmPaymentComponent,
    ShopAdminComponent,
    NotSupportedComponent,
    ShopOrderComponent,
    PickupOrderComponent,
    DeliverOrderComponent,
    ToUrlPipe,
    CartDetailsComponent,
    ShopSettingsComponent,
    ShopGeneralSettingsComponent,
    ShopProductSettingsComponent,
    ShopTimesSettingsComponent,
    IconSelectionComponent,
    RefundOrderComponent,
    CustomerSettingsComponent,
    PaymentMethodsComponent,
    PaddToPipe,
    PaymentMethodSelectionSheetComponent,
    ShopInfoDialogComponent,
    ShopOrderCommentComponent,
    AddressComponent,
    ContactComponent,
    EditPromotionComponent,
    BubblesComponent,
    ResetPasswordComponent,
    SendPasswordResetEmailComponent,
    NotFoundComponent,
    FooterComponent,
    ContinueComponent,
    PrivacyComponent,
    TermsComponent,
    CustomerOrdersComponent,
    OrderStatusPipe,
    CustomerOrderComponent,
    CustomerOrderDetailsComponent,
    VerifyEmailComponent,
    ConfirmEmailComponent,
    ShopOrdersComponent,
    InstallBannerComponent,
    OrderPricingDetailsComponent,
    BecomeAPartnerBannerComponent,
    BecomeAPartnerComponent,
    PartnerFormComponent,
    AboutPageComponent,
    HelpPageComponent,
    ShopSetupComponent,
    ShopVerificationDocumentsComponent,
    SecuritySettingsComponent,
    TwoFactorCodeEntryComponent,
    SuperAdminDashboardComponent,
    SuperAdminUsersComponent,
    SuperAdminShopsComponent,
    SuperAdminOrdersComponent,
    SuperAdminUserComponent,
    BubbleScreenComponent,
    NumberRoundingPipe,
    SuperAdminShopComponent,
    CapitalizePipe,
    EditProductDialogComponent,
    EditProductGroupDialogComponent,
    FirstShopOpeningComponent,
    ShopUsersSettingsComponent,
    ShopInvitesComponent,
    EmptyComponent,
    ShopsMapComponent,
    ShopNeighboursMapDialogComponent,
    SuperAdminDoShopPayoutComponent,
    ShopPayoutSettingsComponent,
    SuperAdminShopPayoutsComponent,
    ShopPayoutsComponent,
    SuperAdminShopPayoutComponent,
    GdprComponent,
    CookieBannerComponent,
    BecomeAPartnerSuccessComponent,
    CollectOrderComponent,
    DatePickerComponent,
    ConfirmationComponent,
    SprinkyOnBikeComponent,
    ScrollIndicatorComponent,
    UnsubscribeComponent,
    SuperAdminCampaignsComponent,
    NumberLimitDirective,
    OrderHelpDialogComponent,
    NotificationDialogComponent,
    SprinkCreditSettingsComponent,
    ReferralsComponent,
    CantChargeExtraDialogComponent,
    RequestNotificationBoxComponent,
    PayoutDetailsDialogComponent,
    ServiceProviderTermsComponent,
    NotSupportedNewComponent,
    ReferralAdComponent,
    PayoutsExplainedComponent,
    ShopFaqsComponent,
    ProductsImportPreviewDialogComponent,
    PostcodeSearchComponent,
    SuperAdminPromotionsComponent,
    ProductParentSelectionDialogComponent,
    ProductSelectionDialogComponent,
    ProductAmountSelectionDialogComponent,
    CheckoutProductSelectionComponent,
    PickupAddProductDialogComponent,
    SortByPipe,
    IntroAnimationComponent,
    ShopMarketingSettingsComponent,
    NewOrderSignupComponent,
    ShopSelectionComponent,
    SelectionShopInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatMomentDateModule,
    MatTabsModule,
    MatRadioModule,
    SocialLoginModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DragDropModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    CartDetailsComponent,
    IconSelectionComponent,
    RefundOrderComponent,
    PaymentMethodSelectionSheetComponent,
    ShopInfoDialogComponent,
    ShopNeighboursMapDialogComponent,
    ShopOrderCommentComponent,
    EditPromotionComponent,
    EditProductDialogComponent,
    EditProductGroupDialogComponent,
    OrderHelpDialogComponent,
    NotificationDialogComponent,
    CantChargeExtraDialogComponent,
    PayoutDetailsDialogComponent,
    ProductsImportPreviewDialogComponent,
    ProductParentSelectionDialogComponent,
    ProductAmountSelectionDialogComponent,
    PickupAddProductDialogComponent,
    NewOrderSignupComponent,
    SelectionShopInfoDialogComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-GB'
      // useValue: navigator.language === 'en-US' ? 'en-US' : 'en-GB'
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
