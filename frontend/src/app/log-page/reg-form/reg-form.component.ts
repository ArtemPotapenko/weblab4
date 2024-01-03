import { Component } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-reg-form',
  standalone: true,
  imports: [],
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.css'
})
export class RegFormComponent {

  public send() {
    let login = ($("#login").get(0) as HTMLInputElement).value;
    let password = ($("#password").get(0) as HTMLInputElement).value;
    let repeat_password = ($("#repeat_password").get(0) as HTMLInputElement).value;
    let that = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/auth/reg",
      data: JSON.stringify({"login": login,
        "password": password,
        "repeatPassword" : repeat_password
      }),
      contentType: "application/json",
      success: function (data) {
        localStorage.setItem("token", data.token);
        window.location.replace("/point");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        let newVar = $(".error_msg p").get(0);
        newVar?.replaceChildren(jqXHR.responseText);
      }
    })

  }
}
