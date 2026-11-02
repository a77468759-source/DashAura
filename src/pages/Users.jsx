import { useCallback, useMemo, useState } from "react";
import { Plus, Search, UsersRound } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageHeading from "../components/common/PageHeading";
import UserModal from "../components/forms/UserModal";
import UsersTable from "../components/tables/UsersTable";
import { usersSeed } from "../data/mockData";

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState(usersSeed);
  const search = searchParams.get("q") ?? "";
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [notice, setNotice] = useState("");
  const closeModal = useCallback(() => {
    setEditingUser(null);
    setIsAddingUser(false);
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = !query || `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All statuses" || user.status === statusFilter;
      const matchesRole = roleFilter === "All roles" || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, statusFilter, roleFilter]);

  function saveUser(userDetails) {
    if (editingUser) {
      setUsers((currentUsers) => currentUsers.map((user) => user.id === editingUser.id ? { ...user, ...userDetails } : user));
      setNotice(`${userDetails.name}'s details were updated.`);
    } else {
      setUsers((currentUsers) => [...currentUsers, { ...userDetails, id: Date.now(), joined: "Today" }]);
      setNotice(`${userDetails.name} was added to the workspace.`);
    }
    closeModal();
  }

  function deleteUser(user) {
    if (!window.confirm(`Delete ${user.name} from this workspace?`)) return;
    setUsers((currentUsers) => currentUsers.filter((item) => item.id !== user.id));
    setNotice(`${user.name} was removed from the workspace.`);
  }

  function updateSearch(event) {
    const nextParams = new URLSearchParams(searchParams);
    if (event.target.value) nextParams.set("q", event.target.value);
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  }

  const roles = [...new Set(users.map((user) => user.role))].sort();
  const modalUser = editingUser ?? (isAddingUser ? undefined : null);

  return (
    <div>
      <PageHeading eyebrow="Workspace directory" title="Team members" description="Manage the people who have access to your workspace.">
        <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700" onClick={() => setIsAddingUser(true)}>
          <Plus size={17} aria-hidden="true" /> Add user
        </button>
      </PageHeading>

      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card" aria-labelledby="users-list-heading">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <h3 id="users-list-heading" className="font-semibold text-ink">All users <span className="ml-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-800">{users.length}</span></h3>
            <p className="mt-1 text-xs text-slate-500">A list of everyone in your workspace</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-[minmax(190px,1fr)_auto_auto]">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-slate-400 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Search users by name, email, or role</span>
              <input className="min-w-0 flex-1 text-sm text-ink outline-none placeholder:text-slate-400" type="search" placeholder="Search users..." value={search} onChange={updateSearch} />
            </label>
            <label>
              <span className="sr-only">Filter users by status</span>
              <select className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option>All statuses</option><option>Active</option><option>Pending</option><option>Inactive</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Filter users by role</span>
              <select className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                <option>All roles</option>{roles.map((role) => <option key={role}>{role}</option>)}
              </select>
            </label>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{notice}</p>
        {filteredUsers.length > 0 ? (
          <UsersTable users={filteredUsers} onEdit={setEditingUser} onDelete={deleteUser} />
        ) : (
          <div className="border-t border-slate-200 px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-violet-50 text-violet-700"><UsersRound size={22} aria-hidden="true" /></span>
            <h4 className="mt-4 font-semibold text-ink">No users found</h4>
            <p className="mt-1 text-sm text-slate-500">Try changing your search or filters, or add a new team member.</p>
            <button type="button" className="mt-4 text-sm font-semibold text-violet-700 hover:text-violet-900 focus-visible:rounded" onClick={() => { setSearchParams({}, { replace: true }); setStatusFilter("All statuses"); setRoleFilter("All roles"); }}>
              Clear filters
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>Showing <span className="font-semibold text-slate-700">{filteredUsers.length}</span> of <span className="font-semibold text-slate-700">{users.length}</span> users</p>
          <p>Changes are saved to this session only.</p>
        </div>
      </section>

      {modalUser !== null && <UserModal user={modalUser} onClose={closeModal} onSave={saveUser} />}
    </div>
  );
}

export default Users;
