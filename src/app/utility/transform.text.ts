import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class TransformText {

  userRoleToText(userRole: string) {
    if (userRole == "SPINE_ADMIN") return "Spine Administrator"
    if (userRole == "SPINE_USER") return "Spine Gebruiker"
    if (userRole == "CAREGIVER") return "Hulpverlener"
    return "Onbekende Rol"
  }

  userStatusToText(userStatus: boolean){
    if(userStatus) return "Actief"
    if(!userStatus) return "Non-actief"
    return "Status onbekend"
  }
}
