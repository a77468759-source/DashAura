import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const roles = ["Administrator", "Engineering", "Product Designer", "Marketing", "Customer Success"];

function UserModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.role ?? "Engineering");
  const [status, setStatus] = useState(user?.status ?? "Active");
  const nameInput = useRef(null);
  const dialog = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameInput.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = [...dialog.current.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    onSave({
      ...user,
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      initials,
      color: user?.color ?? "bg-violet-100 text-violet-800",
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/45 p-4" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section ref={dialog} className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="user-modal-title" aria-describedby="user-modal-description">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="user-modal-title" className="text-xl font-semibold text-ink">{user ? "Edit team member" : "Add a team member"}</h2>
            <p id="user-modal-description" className="mt-1 text-sm text-slate-500">{user ? "Update this person's workspace details." : "Add someone new to your workspace."}</p>
          </div>
          <button type="button" className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-violet-700" onClick={onClose} aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="user-name">Full name <span aria-hidden="true" className="text-rose-600">*</span></label>
            <input ref={nameInput} id="user-name" name="name" autoComplete="name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="user-email">Email address <span aria-hidden="true" className="text-rose-600">*</span></label>
            <input id="user-email" name="email" type="email" autoComplete="email" required maxLength={120} value={email} onChange={(event) => setEmail(event.target.value)} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="user-role">Role</label>
              <select id="user-role" name="role" value={role} onChange={(event) => setRole(event.target.value)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
                {roles.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="user-status">Status</label>
              <select id="user-status" name="status" value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
                <option>Active</option><option>Pending</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button type="button" className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={onClose}>Cancel</button>
            <button type="submit" className="h-10 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white hover:bg-violet-800">{user ? "Save changes" : "Add user"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UserModal;
