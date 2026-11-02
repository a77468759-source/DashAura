import { Pencil, Trash2 } from "lucide-react";

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">Workspace users, roles, statuses, and actions</caption>
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-500">
            <th className="px-5 py-3.5 font-medium" scope="col">Name</th>
            <th className="px-4 py-3.5 font-medium" scope="col">Role</th>
            <th className="px-4 py-3.5 font-medium" scope="col">Status</th>
            <th className="px-4 py-3.5 font-medium" scope="col">Date added</th>
            <th className="px-5 py-3.5 text-right font-medium" scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="transition hover:bg-slate-50/70">
              <th className="px-5 py-4 font-normal" scope="row">
                <div className="flex items-center gap-3">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${user.color}`} aria-hidden="true">{user.initials}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{user.name}</span>
                    <span className="block truncate text-xs text-slate-500">{user.email}</span>
                  </span>
                </div>
              </th>
              <td className="px-4 py-4 text-sm text-slate-600">{user.role}</td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  user.status === "Active" ? "bg-emerald-50 text-emerald-800" : user.status === "Pending" ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-700"
                }`}>
                  <span className={`size-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-600" : user.status === "Pending" ? "bg-amber-600" : "bg-slate-500"}`} aria-hidden="true" />{user.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-500">{user.joined ?? "Today"}</td>
              <td className="px-5 py-4">
                <div className="flex justify-end gap-1">
                  <button type="button" className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-violet-50 hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-violet-700" onClick={() => onEdit(user)} aria-label={`Edit ${user.name}`}>
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button type="button" className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-rose-700" onClick={() => onDelete(user)} aria-label={`Delete ${user.name}`}>
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
