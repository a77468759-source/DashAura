import { useState } from "react";
import { Bell, Building2, CircleUserRound, Moon, ShieldCheck, Sun } from "lucide-react";
import PageHeading from "../components/common/PageHeading";
import { useTheme } from "../hooks/useTheme";

const initialNotifications = {
  productUpdates: true,
  weeklySummary: true,
  securityAlerts: false,
};

function Settings() {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({ name: "Jordan Davis", email: "jordan.davis@dashaura.io", workspace: "Dashaura Studio", timezone: "America/Los_Angeles" });
  const [notifications, setNotifications] = useState(initialNotifications);
  const [savedMessage, setSavedMessage] = useState("");

  function updateProfile(event) {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setSavedMessage("");
  }

  function toggleNotification(event) {
    const { name, checked } = event.target;
    setNotifications((currentPreferences) => ({ ...currentPreferences, [name]: checked }));
    setSavedMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedMessage("Your settings have been saved for this session.");
  }

  return (
    <div>
      <PageHeading eyebrow="Personalize your workspace" title="Settings" description="Manage your profile, workspace details, and notification preferences." />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="appearance-heading">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-700">
              {theme === "dark" ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </span>
            <div>
              <h3 id="appearance-heading" className="font-semibold text-ink">Appearance</h3>
              <p className="mt-1 text-sm text-slate-500">Choose a light or dark look for your workspace.</p>
            </div>
          </div>
          <fieldset>
            <legend className="sr-only">Choose a color theme</legend>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "light", label: "Light", Icon: Sun },
                { value: "dark", label: "Dark", Icon: Moon },
              ].map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${
                    theme === value ? "border-violet-600 bg-violet-50 text-violet-800" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setTheme(value)}
                  aria-pressed={theme === value}
                >
                  <Icon size={16} aria-hidden="true" />{label}
                </button>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="profile-heading">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-700"><CircleUserRound size={20} aria-hidden="true" /></span>
            <div>
              <h3 id="profile-heading" className="font-semibold text-ink">Profile information</h3>
              <p className="mt-1 text-sm text-slate-500">Update your personal details and contact information.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="profile-name">Full name</label>
              <input id="profile-name" name="name" autoComplete="name" required maxLength={80} value={profile.name} onChange={updateProfile} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="profile-email">Email address</label>
              <input id="profile-email" name="email" type="email" autoComplete="email" required maxLength={120} value={profile.email} onChange={updateProfile} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="workspace-heading">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Building2 size={20} aria-hidden="true" /></span>
            <div>
              <h3 id="workspace-heading" className="font-semibold text-ink">Workspace preferences</h3>
              <p className="mt-1 text-sm text-slate-500">Choose how your workspace is identified and localized.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="workspace-name">Workspace name</label>
              <input id="workspace-name" name="workspace" required maxLength={80} value={profile.workspace} onChange={updateProfile} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="timezone">Time zone</label>
              <select id="timezone" name="timezone" value={profile.timezone} onChange={updateProfile} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
                <option value="America/Los_Angeles">Pacific Time (UTC−08:00)</option>
                <option value="America/Denver">Mountain Time (UTC−07:00)</option>
                <option value="America/Chicago">Central Time (UTC−06:00)</option>
                <option value="America/New_York">Eastern Time (UTC−05:00)</option>
                <option value="Europe/London">London (UTC+00:00)</option>
                <option value="Asia/Kolkata">India Standard Time (UTC+05:30)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card md:p-6" aria-labelledby="notifications-heading">
          <div className="mb-4 flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-800"><Bell size={20} aria-hidden="true" /></span>
            <div>
              <h3 id="notifications-heading" className="font-semibold text-ink">Notification preferences</h3>
              <p className="mt-1 text-sm text-slate-500">Choose which updates you would like to receive.</p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
              <span><span className="block text-sm font-medium text-slate-800">Product updates</span><span className="mt-1 block text-xs text-slate-500">News about features and improvements.</span></span>
              <span className="relative inline-flex shrink-0">
                <input className="peer sr-only" type="checkbox" name="productUpdates" checked={notifications.productUpdates} onChange={toggleNotification} />
                <span aria-hidden="true" className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-violet-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-700 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
                <span className="sr-only">Receive product updates</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
              <span><span className="block text-sm font-medium text-slate-800">Weekly summary</span><span className="mt-1 block text-xs text-slate-500">A weekly overview of workspace activity.</span></span>
              <span className="relative inline-flex shrink-0">
                <input className="peer sr-only" type="checkbox" name="weeklySummary" checked={notifications.weeklySummary} onChange={toggleNotification} />
                <span aria-hidden="true" className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-violet-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-700 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
                <span className="sr-only">Receive weekly summary</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-5 py-4">
              <span><span className="block text-sm font-medium text-slate-800">Security alerts</span><span className="mt-1 block text-xs text-slate-500">Important security and sign-in activity.</span></span>
              <span className="relative inline-flex shrink-0">
                <input className="peer sr-only" type="checkbox" name="securityAlerts" checked={notifications.securityAlerts} onChange={toggleNotification} />
                <span aria-hidden="true" className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-violet-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-700 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
                <span className="sr-only">Receive security alerts</span>
              </span>
            </label>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:flex-row sm:items-center" aria-label="Security information">
          <ShieldCheck className="shrink-0 text-emerald-800" size={20} aria-hidden="true" />
          <p className="text-sm text-emerald-900">Your settings are stored only in the current browser session. No account data is sent to a server.</p>
        </section>

        <div className="flex flex-col-reverse items-start justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
          <p className="min-h-5 text-sm text-emerald-800" role="status" aria-live="polite">{savedMessage}</p>
          <button type="submit" className="h-10 rounded-lg bg-violet-700 px-5 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700">Save changes</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
