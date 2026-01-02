import { useMemo } from "react";

const FIELD_LABELS = {
  address: "Adres",
  bio: "Biyografi",
  BusinessType: "İş Türü",
  coverPicture: "Kapak Fotoğrafı",
  email: "E-posta",
  isEmailVerified: "E-posta Doğrulandı",
  isPhoneVerified: "Telefon Doğrulandı",
  location: "Konum",
  name: "İsim",
  phoneNumbers: "Telefon Numaraları",
  profilePicture: "Profil Fotoğrafı",
  services: "Hizmetler",
  tags: "Etiketler",
  userName: "Kullanıcı Adı",
  websites: "Web Siteleri",
  WorkingHours: "Çalışma Saatleri",
};

const IGNORE_FIELDS = [
  "id", "_id", "active", "createdAt", "updatedAt", "__v", "password",
  "isBlocked", "isVerified", "isFollowing", "followersCount",
  "followingCount", "postsCount",
];

export function useCompleteProfileLogic(user) {
  const { fields, completionPercentage, isLoading } = useMemo(() => {
    if (!user || Object.keys(user).length === 0) {
      return { fields: [], completionPercentage: 0, isLoading: true };
    }

    const validEntries = Object.entries(user).filter(
      ([key]) => !IGNORE_FIELDS.includes(key)
    );

    const processedFields = validEntries.map(([key, val]) => {
      // Determine if field is complete
      let isComplete = false;
      if (Array.isArray(val)) {
        isComplete = val.length > 0;
      } else if (typeof val === "object" && val !== null) {
        isComplete = Object.keys(val).length > 0;
      } else {
        isComplete = val != null && val !== "" && val !== undefined;
      }

      // Format Label
      const rawLabel = FIELD_LABELS[key] ?? key;
      // Clean camelCase if fallback to key is used, otherwise use mapped label
      const label = FIELD_LABELS[key] 
        ? rawLabel 
        : rawLabel.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

      return {
        key,
        label,
        isComplete,
        value: val,
      };
    }).sort((a, b) => a.label.localeCompare(b.label));

    const completedCount = processedFields.filter((f) => f.isComplete).length;
    const totalCount = processedFields.length;
    
    const percentage = totalCount > 0 
      ? Math.round((100 / totalCount) * completedCount) 
      : 0;

    return {
      fields: processedFields,
      completionPercentage: percentage,
      isLoading: false,
    };
  }, [user]);

  return { fields, completionPercentage, isLoading };
}
