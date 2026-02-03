import { ProfileItem } from "./ProfileSection";

type BuildArgs = {
  push: (href: string) => void;
  themeLabel?: string;
  languageLabel?: string;
};

export function buildProfileSections({
  push,
  themeLabel = "System",
  languageLabel = "English",
}: BuildArgs) {
  const account: ProfileItem[] = [
    {
      key: "manage-profile",
      title: "Manage profile",
      subtitle: "Update your personal details",
      onPress: () => push("/profile/manage-profile"),
    },
    {
      key: "password-security",
      title: "Password & security",
      subtitle: "Change password, protect account",
      onPress: () => push("/profile/password-security"),
    },
    {
      key: "notifications",
      title: "Notifications",
      subtitle: "Push, email, in-app alerts",
      onPress: () => push("/profile/notifications"),
    },
    {
      key: "language",
      title: "Language",
      rightText: languageLabel,
      onPress: () => push("/profile/language"),
    },
  ];

  const preferences: ProfileItem[] = [
    {
      key: "about-us",
      title: "About us",
      subtitle: "Learn more about this app",
      onPress: () => push("/profile/about-us"),
    },
    {
      key: "theme",
      title: "Theme",
      rightText: themeLabel,
      onPress: () => push("/profile/theme"),
    },
  ];

  const support: ProfileItem[] = [
    {
      key: "help-center",
      title: "Help center",
      subtitle: "FAQs and guides",
      onPress: () => push("/profile/help-center"),
    },
    {
      key: "contact-us",
      title: "Contact us",
      subtitle: "Get in touch with support",
      onPress: () => push("/profile/contact-us"),
    },
  ];

  return { account, preferences, support };
}
