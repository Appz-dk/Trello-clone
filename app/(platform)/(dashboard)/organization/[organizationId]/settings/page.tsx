import { OrganizationProfile } from "@clerk/nextjs"

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile 
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              boxShadow: "none",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
            pageScrollBox: {
              padding: "1.25rem"
            },
            navbar: {
              padding: "1.25rem"
            }
          }
        }}
      />
    </div>
  )
}

export default SettingsPage