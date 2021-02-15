import { Injectable } from '@angular/core';

@Injectable({
    'providedIn': 'root'
}
)
export class UserModel {

    transformData(data: any) {
        return {
            "businessId": data.businessId,
            "businessName": data.businessName,
            "emailAddress": data.emailAddress,
            "firstName": data.firstName,
            "lastName": data.lastName,
            "phone": data.phone,
            "zipCode": data.zipCode,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "businessImageId": data.businessImageId,
            "businessImageName": data.businessImageName,
            "fax": data.fax,
            "category": data.category,
            "subCategory": data.subCategory,
            "businessUrl": data.businessUrl,
            "streetAddress": data.streetAddress,
            "city": data.city,
            "state": data.state,
            "status": data.status,
            "country": data.country
        }
    }
}