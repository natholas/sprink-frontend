import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distance } from '../libs/distance';

@Injectable({
  providedIn: 'root'
})
export class PostcodesService {

  public postCodeData: any
  public totalPop = 0
  private postCodeCache: any = {}

  constructor(private http: HttpClient) { }

  async getPostCodeData() {
    if (this.postCodeData) return this.postCodeData
    this.postCodeData = await this.http.get('https://flappy.nathanfelix.com/sorted-postcodes-simple.json').toPromise()
    this.postCodeData.forEach(p => this.totalPop += p[2])
    return this.postCodeData
  }

  evaluateCoverage(coords: number[], maxDist: number) {
    if (!this.postCodeData) return
    let postCodes = []
    let pop = 0
    this.postCodeData.forEach(d => {
      let dist = distance(coords[1], coords[0], d[0], d[1])
      if (dist < maxDist) {
        postCodes.push(d[3])
        pop += d[2]
      }
    })
    return pop
  }

  public convertPostCode(input: string) {
    let out = input.toLocaleLowerCase().split(' ').join(' ')
    return out.substring(0, out.length - 3) + ' ' + out.substr(-3)
  }

  async geoCode(postCode: string) {
    if (this.postCodeCache[postCode]) return this.postCodeCache[postCode]
    try {
      let resp = await this.http.get('https://api.postcodes.io/postcodes/' + postCode.split(' ').join('')).toPromise()
      this.postCodeCache[postCode] = resp
      return resp
    } catch(err) {
      console.error(err);
      return false
    }
  }
}
