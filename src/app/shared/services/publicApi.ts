import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PublicApi {
    env: any = environment;

    constructor(private http: HttpClient) {

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

    appendURL(string: any, key: any, value: any) {
        let concatStr = ":" + key;
        return string.replace(concatStr, value);
    }

    login(data: any) {
        let url = this.getURL('login');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    register(data: any) {
        let url = this.getURL('register');
        let body = data;
        return this.http.post(url, body, this.getHeaders());
    }

    confirm(token: string) {
        let url = this.getURL('regConfirm');
        url = this.appendURL(url, 'token', token);
        return this.http.get(url, this.getHeaders());
    }

    getChatIconURL() {
        return this.env.chatIconUrl;
    }

    getAgentID() {
        return this.env.chatAgentId;
    }

    saveContacts(data: any) {
        let url = this.getURL('saveContacts');
        let body = data;
        return this.http.post(url, body, this.getHeaders())
    }

    socialMediaLogin(data: any) {
        let url = this.getURL('socialMediaLogin');
        let body = data;
        return this.http.post(url, body, this.getHeaders())
    }
}