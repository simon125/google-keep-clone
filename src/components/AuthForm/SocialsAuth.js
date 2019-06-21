import React from "react";
import { Card, Icon } from "../../UI/theme";
import {
  SocialsContainer,
  FacebookBtn,
  GoogleBtn,
  FormHeader
} from "./common-theme";

function SocialsAuth() {
  return (
    <Card>
      <FormHeader>Continue with socials</FormHeader>
      <SocialsContainer>
        <FacebookBtn>
          Sing in with <Icon className="fab fa-facebook-square" />
        </FacebookBtn>
        <GoogleBtn>
          Sing in with <Icon className="fab fa-google" />
        </GoogleBtn>
      </SocialsContainer>
    </Card>
  );
}

export default SocialsAuth;
