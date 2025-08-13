"use client";
import { SecondaryBtn } from "@/components/btn";
import { putUser } from "@/services/user";

/**
 *
 * @param {Object} props
 * @param {String} props.value
 * @param {String} props.name
 * @param {String} props.title
 * @description A form component for entering a website URL.
 * @returns React.Component
 */
export default function FormsWebsite({
   value = "",
   name = "website",
   title = "Website",
   icon = "bx bx-globe",
}) {
   const defaultTemplate = [];

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const website = formData.get(name);

      putUser({
         [name]: website || null,
      })
         .then(() => {
            // Optionally, you can handle success here, e.g., show a success message
            console.log("Website updated successfully");
         })
         .catch((error) => {
            // Handle error here, e.g., show an error message
            console.error("Error updating website:", error);
         });
      e.target.reset();
   };

   return (
      <form onSubmit={handleSubmit}>
         <b className="py-2 inline-block">{title}</b>
         <div className="flex items-center gap-2">
            <label className="w-full  flex items-center gap-4 input">
               <span className={`${icon}`}></span>
               <input
                  type="url"
                  name={name}
                  className="w-full bg-transparent outline-none"
                  placeholder="Enter your location"
                  defaultValue={value}
               />
            </label>
            <SecondaryBtn type="submit">Kaydet</SecondaryBtn>
         </div>
      </form>
   );
}
