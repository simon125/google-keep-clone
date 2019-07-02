import React from "react";
import { Card, Icon } from "../../UI/theme";
import {
  SocialsContainer,
  FacebookBtn,
  GoogleBtn,
  FormHeader
} from "./common-elements";
import { signInWithGoogle, signInWithFacebook } from "../../firebase";

function SocialsAuth() {
  return (
    <Card>
      <FormHeader>Continue with socials</FormHeader>
      <SocialsContainer>
        <FacebookBtn onClick={signInWithFacebook}>
          Sing in with <Icon className="fab fa-facebook-square" />
        </FacebookBtn>
        <GoogleBtn onClick={signInWithGoogle}>
          Sing in with <Icon className="fab fa-google" />
        </GoogleBtn>
      </SocialsContainer>
    </Card>
  );
}

export default SocialsAuth;
