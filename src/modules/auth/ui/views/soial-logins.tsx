import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { authClient } from "@/lib/auth-client";
import { Dispatch, SetStateAction } from "react";

type SocialLoginsProps = {
  setError: Dispatch<SetStateAction<string | null>>
  setIsPending: Dispatch<SetStateAction<boolean>>
}

export const SocialLogins = ({ setIsPending, setError }: SocialLoginsProps) => {

  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setIsPending(true);

    authClient.signIn.social({
      provider,
      callbackURL: "/"
    }, {
      onSuccess: () => {
        setIsPending(false);
      },
      onError: ({ error }) => {
        setIsPending(false);
        setError(error.message);
      },
    })
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full gap-2" onClick={() => onSocial("google")}>
        <Icons.google />
        Google
      </Button>
      <Button variant="outline" className="w-full gap-2" onClick={() => onSocial("github")}>
        <Icons.github />
        Github
      </Button>
    </div>
  )
}