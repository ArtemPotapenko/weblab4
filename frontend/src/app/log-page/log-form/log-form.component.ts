import {Component} from '@angular/core';
import $, {data} from "jquery";


@Component({
    selector: 'app-log-form',
    standalone: true,
    imports: [],
    templateUrl: './log-form.component.html',
    styleUrl: './log-form.component.css'
})
export class LogFormComponent {
    private err = $(".error_msg p").get(0);

    public send() {
        let login = ($("#login").get(0) as HTMLInputElement).value;
        let password = ($("#password").get(0) as HTMLInputElement).value;
        let that = this;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/auth/login",
            data: JSON.stringify({"login": login, "password": password}),
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
