import { Injectable, EventEmitter } from '@angular/core';
import { StateService } from './state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SocialUser } from 'angularx-social-login';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  notificationSub: any
  dontShowNotificationDialog = false
  onGotUser = new EventEmitter<any>()
  gettingUser = false

  constructor(
    private state: StateService,
    private http: HttpClient,
    private swPush: SwPush,
    private router: Router,
    private storage: StorageService,
    private dialog: MatDialog,
  ) { }

  private async returnWhenGotUser() {
    return new Promise(resolve => {
      let sub = this.onGotUser.subscribe(() => {
        resolve()
        sub.unsubscribe()
      })
    })
  }

  public async getUser(force = false) {
    if (this.gettingUser && !force) return this.returnWhenGotUser()
    let resp: any
    try {
      this.gettingUser = true
      resp = <any>await this.http.get(environment.apiEndpoint + '/user', { headers: { Authorization: this.state.token } }).toPromise()
      if (!resp.status) return alert(resp.error)
      this.state.user = resp.data

      // Removing the local sub if the user has not allowed advertising so that we can show them the popup again
      if (!this.state.user.allowAdvertising) {
        let subs = this.storage.getLocal('notificationSubs') || []
        let index = subs.indexOf(this.state.user._id)
        if (index > -1) subs.splice(index, 1)
        this.storage.setLocal('notificationSubs', subs)
      }

      this.onGotUser.emit()
      this.gettingUser = false
      return this.state.user
    } catch(err) {
      this.logout()
      console.error(err);
      this.gettingUser = false
    }
  }

  public async createSession() {
    let acquisitionSource = this.state.acquisitionSource
    return <any>await this.http.post(environment.apiEndpoint + '/session', { acquisitionSource }, { headers: { Authorization: this.state.token } }).toPromise()
  }

  public async deleteSession(id: string) {
    if (!id) return
    sessionStorage.removeItem('sessionId')
    this.storage.remove('sessionId')
    return <any>await this.http.delete(environment.apiEndpoint + '/session/' + id).toPromise()
  }

  async initSession() {
    let sessionId = sessionStorage.getItem('sessionId')
    if (!sessionId) {
      let oldSessionId = this.storage.getLocal('sessionId')
      if (oldSessionId) await this.deleteSession(oldSessionId)
      let resp = await this.createSession()
      if (resp && resp.data) {
        sessionId = resp.data.session._id
        sessionStorage.setItem('sessionId', sessionId)
        this.storage.setLocal('sessionId', sessionId)
      }
    }
    this.state.sessionId = sessionId
  }

  async findAddress(postcode: string) {
    // return new Promise((r) => {
    //   setTimeout(() => {
    //     r({ "status": 1, "data": { "result": [{ "postcode": "ME17 3LY", "post_town": "MAIDSTONE", "dependant_locality": "Langley", "double_dependant_locality": "", "thoroughfare": "Sutton Road", "dependant_thoroughfare": "", "building_number": "", "building_name": "Rectory Farm", "sub_building_name": "", "po_box": "", "department_name": "", "organisation_name": "", "udprn": 15042412, "umprn": "", "postcode_type": "S", "su_organisation_indicator": "", "delivery_point_suffix": "1A", "postcode_inward": "3LY", "postcode_outward": "ME17", "line_1": "Rectory Farm", "line_2": "Sutton Road", "line_3": "Langley", "premise": "Rectory Farm", "longitude": 0.585579, "latitude": 51.230566, "eastings": 580617, "northings": 151107, "country": "England", "traditional_county": "Kent", "administrative_county": "Kent", "postal_county": "Kent", "county": "Kent", "district": "Maidstone", "ward": "Sutton Valence and Langley" }, { "postcode": "ME17 3LY", "post_town": "MAIDSTONE", "dependant_locality": "Langley", "double_dependant_locality": "", "thoroughfare": "Sutton Road", "dependant_thoroughfare": "", "building_number": "", "building_name": "The Coach House", "sub_building_name": "", "po_box": "", "department_name": "", "organisation_name": "M M (Building) Services", "udprn": 15042410, "umprn": "", "postcode_type": "S", "su_organisation_indicator": "Y", "delivery_point_suffix": "1E", "postcode_inward": "3LY", "postcode_outward": "ME17", "line_1": "M M (Building) Services", "line_2": "The Coach House", "line_3": "Sutton Road, Langley", "premise": "The Coach House", "longitude": 0.585579, "latitude": 51.230566, "eastings": 580617, "northings": 151107, "country": "England", "traditional_county": "Kent", "administrative_county": "Kent", "postal_county": "Kent", "county": "Kent", "district": "Maidstone", "ward": "Sutton Valence and Langley" }, { "postcode": "ME17 3LY", "post_town": "MAIDSTONE", "dependant_locality": "Langley", "double_dependant_locality": "", "thoroughfare": "Sutton Road", "dependant_thoroughfare": "", "building_number": "", "building_name": "The Old Rectory", "sub_building_name": "", "po_box": "", "department_name": "", "organisation_name": "", "udprn": 15042411, "umprn": "", "postcode_type": "S", "su_organisation_indicator": "", "delivery_point_suffix": "1D", "postcode_inward": "3LY", "postcode_outward": "ME17", "line_1": "The Old Rectory", "line_2": "Sutton Road", "line_3": "Langley", "premise": "The Old Rectory", "longitude": 0.585579, "latitude": 51.230566, "eastings": 580617, "northings": 151107, "country": "England", "traditional_county": "Kent", "administrative_county": "Kent", "postal_county": "Kent", "county": "Kent", "district": "Maidstone", "ward": "Sutton Valence and Langley" }, { "postcode": "ME17 3LY", "post_town": "MAIDSTONE", "dependant_locality": "Langley", "double_dependant_locality": "", "thoroughfare": "Sutton Road", "dependant_thoroughfare": "", "building_number": "", "building_name": "Wild Oaks", "sub_building_name": "", "po_box": "", "department_name": "", "organisation_name": "", "udprn": 15042413, "umprn": "", "postcode_type": "S", "su_organisation_indicator": "", "delivery_point_suffix": "1B", "postcode_inward": "3LY", "postcode_outward": "ME17", "line_1": "Wild Oaks", "line_2": "Sutton Road", "line_3": "Langley", "premise": "Wild Oaks", "longitude": 0.585579, "latitude": 51.230566, "eastings": 580617, "northings": 151107, "country": "England", "traditional_county": "Kent", "administrative_county": "Kent", "postal_county": "Kent", "county": "Kent", "district": "Maidstone", "ward": "Sutton Valence and Langley" }], "code": 2000, "message": "Success" } })
    //   }, 1000)
    // })
    let resp = <any>await this.http.get(environment.apiEndpoint + '/address-lookup/' + postcode, { headers: { Authorization: this.state.token } }).toPromise()
    return resp
  }

  public async resendVerificationEmail(email: string) {
    return <any>await this.http.post(environment.apiEndpoint + '/resend-email-verification-email', { email }, { headers: { Authorization: this.state.token } }).toPromise()
  }

  public async unsubscribe(token: string) {
    let resp = <any>await this.http.delete(environment.apiEndpoint + '/unsubscribe/' + token).toPromise()
    return resp
  }

  public async confirmEmail(email: string, token: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/confirm-email', { email, token }).toPromise()
    return resp
  }

  public async updateUser(params: any) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/user', params, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  public async checkLoggedIn() {
    if (!this.state.loggedIn) {
      let token = this.storage.getLocal('token')
      if (token) {
        this.state.loggedIn = true
        this.state.token = token
      }
    }

    if (!this.state.loggedIn) {
      return false
    } else if (!this.state.user) {
      await this.getUser()
    }
    return !!this.state.user
  }

  public async logout(dontNavigate = false) {
    if (this.notificationSub) {
      let key = JSON.parse(JSON.stringify(this.notificationSub)).keys.p256dh
      this.state.user.notificationSubscriptions = this.state.user.notificationSubscriptions.filter(sub => sub.keys?.p256dh && sub.keys?.p256dh !== key)
      await this.updateUser({ notificationSubscriptions: this.state.user.notificationSubscriptions })
    }
    let acceptedCookies = this.storage.getLocal('acceptedCookies')
    let notificationSubs = this.storage.getLocal('notificationSubs')
    this.storage.clear()
    if (acceptedCookies) this.storage.setLocal('acceptedCookies', 'true')
    if (notificationSubs) this.storage.setLocal('notificationSubs', notificationSubs)
    this.deleteSession(this.state.sessionId)
    this.state.user = undefined
    this.state.loggedIn = false
    this.state.token = undefined
    this.state.order = undefined
    this.state.sessionId = undefined
    if (!dontNavigate) this.router.navigate(['continue'])
  }

  async afterLogin(resp) {
    if (resp.data.token) {
      this.state.token = resp.data.token
      this.state.loggedIn = true
      this.storage.setLocal('token', this.state.token)
      await this.getUser()
      await this.initSession()
    } else {
      this.router.navigate(['two-factor-code-entry', resp.data.twoFactorToken])
      return { twoFactor: true }
    }
  }

  async login(email: string, password: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/login/email', { email, password }).toPromise()
    if (resp && resp.status) await this.afterLogin(resp)
    return resp
  }

  async continueWithGoogle(user: SocialUser) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/social-login/google', { idToken: user.idToken, referralCode: this.state.referralCode }).toPromise()
    if (resp && resp.status) await this.afterLogin(resp)
    return resp
  }

  async continueWithFacebook(user: any) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/social-login/facebook', { access_token: user.accessToken, referralCode: this.state.referralCode }).toPromise()
    if (resp && resp.status) await this.afterLogin(resp)
    return resp
  }

  async getNextStep(target: string = 'dashboard', shop: any = undefined) {
    let shopIsSetUp = false
    if (shop) {
      let hasOpeningTimes = shop.pickupTimes.monday || shop.pickupTimes.tuesday || shop.pickupTimes.wednesday || shop.pickupTimes.thursday || shop.pickupTimes.friday || shop.pickupTimes.saturday || shop.pickupTimes.sunday
      if (shop.isVerified && shop.products.length && hasOpeningTimes && shop.name && shop.timeZone && shop.phoneNumber && shop.currency && shop.address.formatted && this.state.user.firstName && this.state.user.lastName) shopIsSetUp = true
      if (!shop.hasEverBeenOpen) shopIsSetUp = false
    }
    await this.checkLoggedIn()
    if (!this.state.user) {
      if (target === 'overview') return { path: ['continue'], queryParams: { cm: 'true' } }
      return { path: ['continue'] }
    }
    if (target === 'verify-email') return undefined
    // if (!this.state.user.isVerified) return { path: ['verify-email'] } // Temp, idea is that customers hate this page
    if (target === 'personal-details') return undefined
    if ((!this.state.user.address || !this.state.user.address.formatted) && this.state.user.userType === 'user') return { path: ['settings', 'personal-details'], queryParams: { isNew: true, returnUrl: target } }
    if (this.state.user.shopId && !shopIsSetUp && target === 'shop-admin' && this.state.user.userType === 'admin') return { path: ['shop-setup'] }
    if (this.state.user.shopId && shopIsSetUp && target === 'shop-setup') return { path: ['shop-admin'] }
    if (this.state.user.shopId && shop && shop.hasEverBeenOpen && target === 'shop-opening') return { path: ['shop-admin'] }
  }

  hasNotificationPermission(): boolean {
    if (!this.state.user.notificationSubscriptions.length) {
      this.storage.setLocal('notificationSubs', [])
      return false
    }
    return !!(this.storage.getLocal('notificationSubs') || []).find((n: any) => n === this.state.user._id)
  }

  async requestNotificationsPermissions(force = false) {
    if (!force && this.dontShowNotificationDialog) return
    if (!force && this.hasNotificationPermission()) return
    history.pushState('popup', '')
    let dialog = this.dialog.open(NotificationDialogComponent, { width: '560px' })
    let resp = await dialog.afterClosed().toPromise()
    if (history.state === 'popup') history.back()
    this.dontShowNotificationDialog = true
    if (!resp) return
    try {
      // As the user said that we are allowed to notify him we will update the user object
      this.storage.setLocal('notificationSubs', (this.storage.getLocal('notificationSubs') || []).concat([this.state.user._id]))
      this.notificationSub = await this.swPush.requestSubscription({ serverPublicKey: environment.webPushPublicKey })
      let key = JSON.parse(JSON.stringify(this.notificationSub)).keys.p256dh
      if (this.state.user.notificationSubscriptions.find(s => !s.keys?.p256dh || s.keys?.p256dh === key)) return
      this.state.user.notificationSubscriptions.push(this.notificationSub)
      this.updateUser({notificationSubscriptions: this.state.user.notificationSubscriptions})
    } catch(e) {
      console.warn(e)
    }
    if (!this.state.user.allowAdvertising) this.updateUser({ allowAdvertising: true })
  }

  async getReferrals() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/user/referrals', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async changePassword(newPassword: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/change-password', { newPassword }, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async check2FactorCode(twoFactorToken: string, twoFactorCode: string) {
    let resp = <any>await this.http.post(environment.apiEndpoint + '/check-two-factor-code', { twoFactorToken, twoFactorCode }).toPromise()
    if (resp && resp.status) await this.afterLogin(resp)
    return resp
  }

  async getShopUsers(id: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/shop-users/' + id, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async deletePersonalData() {
    return <any>await this.http.delete(environment.apiEndpoint + '/user', { headers: { Authorization: this.state.token } }).toPromise()
  }

  async superAdminGetUsers() {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/users', { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async superAdminGetUser(id: string) {
    let resp = <any>await this.http.get(environment.apiEndpoint + '/super-admin/user/' + id, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }

  async makeSuperAdmin(id: string) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/super-admin/make-super-admin/' + id, {}, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }
  async unMakeSuperAdmin(id: string) {
    let resp = <any>await this.http.put(environment.apiEndpoint + '/super-admin/un-make-super-admin/' + id, {}, { headers: { Authorization: this.state.token } }).toPromise()
    if (!resp.status) return alert(resp.error)
    return resp.data
  }
}
