import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberApi {
    env: any = environment;

    constructor(private http: HttpClient) {

    }

    getRequest(requestURL: string) {
        return this.http.get(requestURL, this.getHeaders());
    }

    getURL(envProp: string) {
        let url = this.env.baseUrl + this.env[envProp];
        return url;
    }

    getHeaders() {
        let httpHeaders = new HttpHeaders;
        httpHeaders = httpHeaders.append('content-type', 'application/json');
        const headers = { 'headers': httpHeaders, withCredentials: true }
        return headers;
    }

    getCustomHeaders() {
        let httpHeaders = new HttpHeaders;
        httpHeaders = httpHeaders.append('Content-type', 'multipart/mixed;boundary=xxBOUNDARYxx');
        const headers = { 'headers': httpHeaders }
        return headers;
    }

    appendURL(string: any, key: any, value: any) {
        let concatStr = ":" + key;
        return string.replace(concatStr, value);
    }

    getDeals(data: any) {
        let url = this.getURL('getDeals');
        let body = data.post;
        let urlData = data.get;
        //page=2&limit=5&sort=merchantname&dir=DESC
        url = this.appendURL(url, 'page', urlData.page);
        url = this.appendURL(url, 'limit', urlData.limit);
        url = this.appendURL(url, 'sort', urlData.sort);
        url = this.appendURL(url, 'dir', urlData.dir);
        return this.http.post(url, body, this.getHeaders());
    }

    saveDeals(data: any) {
        let url = this.getURL('saveDeals');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    getDeal(dealId: string) {
        let url = this.getURL('getDeal');
        url = this.appendURL(url, 'dealId', dealId)
        return this.http.get(url, this.getHeaders());
    }

    deleteDeal(dealId: string) {
        let url = this.getURL('deleteDeal');
        url = this.appendURL(url, 'dealId', dealId)
        return this.http.delete(url, this.getHeaders());
    }

    getCatgories() {
        let url = this.getURL('getCatgories');
        return this.getRequest(url);
    }

    getSubCatgories(category: any) {
        let url = this.getURL('getSubCatgories');
        url = this.appendURL(url, 'category', category)
        return this.getRequest(url);
    }

    register(data: any) {
        let url = this.getURL('register');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    getProfileByEmail(email: string) {
        let url = this.getURL('getProfile');
        url = this.appendURL(url, 'emailaddress', email)
        return this.getRequest(url);
    }

    getBusinessprofile(businessId: string) {
        let url = this.getURL('businessProfile');
        url = this.appendURL(url, 'businessID', businessId);
        return this.getRequest(url).toPromise();
    }

    getBusinessUsers(data: any) {
        let url = this.getURL('getAllBusiness');
        let postData = null;
        let urlData = data.get;
        url = this.appendURL(url, 'page', urlData.page);
        url = this.appendURL(url, 'limit', urlData.limit);
        url = this.appendURL(url, 'sort', urlData.sort);
        url = this.appendURL(url, 'dir', urlData.dir);
        return this.http.post(url,postData);
    }

    uploadImage(imageData:any) {
        let url = this.getURL('businessImageUpload');
        let postData = imageData;
        return this.http.post(url, postData).toPromise();
    }

    getImageURL(imageID: string) {
        let url = this.getURL('businessImage');
        url = this.appendURL(url, 'imageId', imageID);
        return url;
    }

    updateProfile(data: any) {
        let url = this.getURL('updateProfile');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    updatePayPal(data: any) {
        let url = this.getURL('updatePayPal');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    cancelPayPal(sid :any,data: any) {
        let url = this.getURL('updatePayPal') + '/' + sid;
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    getContacts(data: any) {
        let url = this.getURL('getContacts');
        let body = data.post;
        let urlData = data.get;
        //page=2&limit=25&sort=merchantname&dir=DESC
        url = url + '?';
        url = url + 'page=' + urlData.page + '&';
        url = url + 'limit=' + urlData.limit + '&';
        url = url + 'sort=' + urlData.sort + '&';
        url = url + 'dir=' + urlData.dir;
        // url = this.appendURL(url, 'page', urlData.page);
        // url = this.appendURL(url, 'limit', urlData.limit);
        // url = this.appendURL(url, 'sort', urlData.sort);
        // url = this.appendURL(url, 'dir', urlData.dir);
        console.log(url);
        return this.http.post(url, body, this.getHeaders());
    }

    getContact(contactId: string) {
        let url = this.getURL('getContact');
        url = this.appendURL(url, 'contactId', contactId)
        return this.http.get(url, this.getHeaders());
    }

    toggleDeal(data: any) {
        let url = this.getURL('toggleDeal');
        url = this.appendURL(url, 'status', data.urlData);
        let body = data.postData;
        return this.http.post(url, body, this.getHeaders());
    }

    UpdateMessage(data: any) {
        let url = this.getURL('saveComments');
        url = this.appendURL(url, 'Id', data.Id);
        let body = data.postData;
        return this.http.post(url, body, this.getHeaders());
    }
}

export interface imageResp {
    id: any;
    filename: any;
}