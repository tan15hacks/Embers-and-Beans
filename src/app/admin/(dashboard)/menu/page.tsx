import { revalidatePath } from "next/cache";
import { Coffee, Pencil, Plus, Save, Sparkles, Trash2 } from "lucide-react";
import { menuSections } from "@/data/menu";
import { getPrisma } from "@/lib/db";

const categories = [
  "Signature Sips",
  "Seasonal",
  "Pastries",
  "Coffee Bar",
  "Non-Coffee",
];

const starterMenuItems = menuSections.flatMap((section) =>
  section.items.map((item, index) => ({
    name: item.name,
    description: item.description,
    price: item.price,
    category: section.title,
    image: item.image ?? null,
    imageAlt: item.imageAlt ?? null,
    sortOrder: index,
    featured: section.title === "Signature Sips",
    active: true,
  })),
);

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function revalidateMenuPaths() {
  revalidatePath("/admin/menu");
  revalidatePath("/admin/dashboard");
  revalidatePath("/menu");
  revalidatePath("/");
}

async function importStarterMenu() {
  "use server";

  const prisma = getPrisma();
  const existingItems = await prisma.menuItem.findMany({
    select: {
      name: true,
      category: true,
    },
  });

  const existingKeys = new Set(
    existingItems.map((item) => `${item.category.toLowerCase()}::${item.name.toLowerCase()}`),
  );

  const itemsToCreate = starterMenuItems.filter(
    (item) => !existingKeys.has(`${item.category.toLowerCase()}::${item.name.toLowerCase()}`),
  );

  if (itemsToCreate.length > 0) {
    await prisma.menuItem.createMany({
      data: itemsToCreate,
    });
  }

  revalidateMenuPaths();
}

async function createMenuItem(formData: FormData) {
  "use server";

  const prisma = getPrisma();

  await prisma.menuItem.create({
    data: {
      name: getString(formData, "name"),
      description: getString(formData, "description"),
      price: getString(formData, "price"),
      category: getString(formData, "category"),
      image: getString(formData, "image") || null,
      imageAlt: getString(formData, "imageAlt") || null,
      sortOrder: getNumber(formData, "sortOrder"),
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    },
  });

  revalidateMenuPaths();
}

async function updateMenuItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const prisma = getPrisma();

  await prisma.menuItem.update({
    where: { id },
    data: {
      name: getString(formData, "name"),
      description: getString(formData, "description"),
      price: getString(formData, "price"),
      category: getString(formData, "category"),
      image: getString(formData, "image") || null,
      imageAlt: getString(formData, "imageAlt") || null,
      sortOrder: getNumber(formData, "sortOrder"),
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    },
  });

  revalidateMenuPaths();
}

async function deleteMenuItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const prisma = getPrisma();

  await prisma.menuItem.delete({
    where: { id },
  });

  revalidateMenuPaths();
}

async function getMenuItems() {
  try {
    const prisma = getPrisma();

    return await prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Admin menu error", error);
    return [];
  }
}

const inputClass =
  "h-11 w-full rounded-xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-3 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A342A]/60";
const statusBadgeClass = "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]";

export default async function AdminMenuPage() {
  const menuItems = await getMenuItems();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#B7793C]">
            Menu Manager
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
            Edit café items.
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-[#4A342A]/75">
            A compact list for quick scanning. Open a row only when you need to edit details.
          </p>
        </div>
        <div className="rounded-full bg-[#FFFDFB] px-5 py-3 text-sm font-bold text-[#4A342A]/70 shadow-[0_14px_50px_rgba(43,30,24,0.06)]">
          {menuItems.length} database item{menuItems.length === 1 ? "" : "s"}
        </div>
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#2B1E18] p-5 text-[#FFFDFB] shadow-[0_20px_70px_rgba(43,30,24,0.14)]">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E5C7A1]/15 text-[#E5C7A1]">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#E5C7A1]">
                Starter Import
              </p>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold">
                Load current menu
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#F8F4EF]/70">
                Import existing drinks and pastries into Neon. Existing name/category matches are skipped.
              </p>
            </div>
          </div>

          <form action={importStarterMenu} className="mt-5">
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#F8F4EF] px-5 text-sm font-semibold text-[#2B1E18] transition hover:bg-[#E5C7A1]"
            >
              <Sparkles className="mr-2" size={16} /> Import Starter Menu
            </button>
          </form>
        </div>

        <details className="group rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-5 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                <Plus size={22} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B7793C]">
                  Add Item
                </p>
                <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold">
                  Create new menu item
                </h2>
                <p className="mt-2 text-sm text-[#4A342A]/70">
                  Click to open the add form.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#2B1E18] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FFFDFB] transition group-open:bg-[#B7793C]">
              Open
            </span>
          </summary>

          <form action={createMenuItem} className="mt-6 grid gap-4 border-t border-[#2B1E18]/10 pt-6 md:grid-cols-2">
            <div>
              <label htmlFor="new-name" className={labelClass}>Name</label>
              <input id="new-name" name="name" required className={inputClass} placeholder="Honey Oat Latte" />
            </div>
            <div>
              <label htmlFor="new-price" className={labelClass}>Price</label>
              <input id="new-price" name="price" required className={inputClass} placeholder="₱185" />
            </div>
            <div>
              <label htmlFor="new-category" className={labelClass}>Category</label>
              <select id="new-category" name="category" className={inputClass} defaultValue="Signature Sips">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="new-sort" className={labelClass}>Sort order</label>
              <input id="new-sort" name="sortOrder" type="number" className={inputClass} defaultValue={0} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="new-description" className={labelClass}>Description</label>
              <textarea
                id="new-description"
                name="description"
                required
                rows={3}
                className="w-full resize-none rounded-xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-3 py-3 text-sm leading-6 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
                placeholder="Espresso, oat milk, wildflower honey, cinnamon."
              />
            </div>
            <div>
              <label htmlFor="new-image" className={labelClass}>Image URL optional</label>
              <input id="new-image" name="image" className={inputClass} placeholder="/images/drinks/honey-oat-latte.jpg" />
            </div>
            <div>
              <label htmlFor="new-image-alt" className={labelClass}>Image alt optional</label>
              <input id="new-image-alt" name="imageAlt" className={inputClass} placeholder="Honey oat latte on a walnut table" />
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <label className="flex items-center gap-2 rounded-xl bg-[#F8F4EF] px-3 py-2 text-sm font-semibold text-[#4A342A]/75">
                <input type="checkbox" name="active" defaultChecked /> Active
              </label>
              <label className="flex items-center gap-2 rounded-xl bg-[#F8F4EF] px-3 py-2 text-sm font-semibold text-[#4A342A]/75">
                <input type="checkbox" name="featured" /> Featured
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:col-span-2"
            >
              <Plus className="mr-2" size={17} /> Add Item
            </button>
          </form>
        </details>
      </section>

      <section className="mt-10 overflow-hidden rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
        <div className="border-b border-[#2B1E18]/10 px-5 py-4">
          <div className="hidden grid-cols-[1.4fr_0.9fr_0.5fr_0.8fr_0.7fr] gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A342A]/50 lg:grid">
            <span>Item</span>
            <span>Category</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold lg:hidden">
            Menu items
          </h2>
        </div>

        {menuItems.length === 0 ? (
          <div className="p-6 text-[#4A342A]/75">
            No database menu items yet. Import the starter menu above or add your first item manually.
          </div>
        ) : (
          <div className="divide-y divide-[#2B1E18]/10">
            {menuItems.map((item) => (
              <article key={item.id} className="px-5 py-4 transition hover:bg-[#F8F4EF]/70">
                <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.5fr_0.8fr_0.7fr] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/12 text-[#B7793C]">
                        <Coffee size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-[var(--font-display)] text-2xl font-semibold leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 hidden truncate text-sm text-[#4A342A]/60 md:block">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-[#F8F4EF] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#4A342A]/65">
                    {item.category}
                  </span>

                  <span className="font-semibold text-[#2B1E18]">{item.price}</span>

                  <div className="flex flex-wrap gap-2">
                    <span className={`${statusBadgeClass} ${item.active ? "bg-[#6E7A5C]/15 text-[#4F5F3F]" : "bg-[#9B3A2F]/10 text-[#9B3A2F]"}`}>
                      {item.active ? "Visible" : "Hidden"}
                    </span>
                    {item.featured && (
                      <span className={`${statusBadgeClass} bg-[#B7793C]/15 text-[#B7793C]`}>
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 lg:justify-end">
                    <details className="group relative">
                      <summary className="inline-flex h-10 cursor-pointer list-none items-center justify-center rounded-full bg-[#2B1E18] px-4 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] [&::-webkit-details-marker]:hidden">
                        <Pencil className="mr-2" size={15} /> Edit
                      </summary>
                    </details>
                    <form action={deleteMenuItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[#9B3A2F]/20 px-4 text-sm font-semibold text-[#9B3A2F] transition hover:bg-[#9B3A2F]/10"
                      >
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </div>
                </div>

                <details className="group mt-4 rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold uppercase tracking-[0.16em] text-[#4A342A]/65 [&::-webkit-details-marker]:hidden">
                    Edit item details
                    <span className="rounded-full bg-[#FFFDFB] px-3 py-1 text-[11px] text-[#B7793C] transition group-open:bg-[#B7793C] group-open:text-[#FFFDFB]">
                      Open
                    </span>
                  </summary>

                  <form action={updateMenuItem} className="mt-5 grid gap-4 border-t border-[#2B1E18]/10 pt-5 md:grid-cols-2">
                    <input type="hidden" name="id" value={item.id} />
                    <div>
                      <label htmlFor={`${item.id}-name`} className={labelClass}>Name</label>
                      <input id={`${item.id}-name`} name="name" required className={inputClass} defaultValue={item.name} />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-price`} className={labelClass}>Price</label>
                      <input id={`${item.id}-price`} name="price" required className={inputClass} defaultValue={item.price} />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-category`} className={labelClass}>Category</label>
                      <select id={`${item.id}-category`} name="category" className={inputClass} defaultValue={item.category}>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-sort`} className={labelClass}>Sort order</label>
                      <input id={`${item.id}-sort`} name="sortOrder" type="number" className={inputClass} defaultValue={item.sortOrder} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor={`${item.id}-description`} className={labelClass}>Description</label>
                      <textarea
                        id={`${item.id}-description`}
                        name="description"
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[#2B1E18]/10 bg-[#FFFDFB] px-3 py-3 text-sm leading-6 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:outline-none"
                        defaultValue={item.description}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-image`} className={labelClass}>Image URL optional</label>
                      <input id={`${item.id}-image`} name="image" className={inputClass} defaultValue={item.image ?? ""} />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-image-alt`} className={labelClass}>Image alt optional</label>
                      <input id={`${item.id}-image-alt`} name="imageAlt" className={inputClass} defaultValue={item.imageAlt ?? ""} />
                    </div>
                    <div className="flex flex-wrap gap-3 md:col-span-2">
                      <label className="flex items-center gap-2 rounded-xl bg-[#FFFDFB] px-3 py-2 text-sm font-semibold text-[#4A342A]/75">
                        <input type="checkbox" name="active" defaultChecked={item.active} /> Active
                      </label>
                      <label className="flex items-center gap-2 rounded-xl bg-[#FFFDFB] px-3 py-2 text-sm font-semibold text-[#4A342A]/75">
                        <input type="checkbox" name="featured" defaultChecked={item.featured} /> Featured
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:col-span-2"
                    >
                      <Save className="mr-2" size={16} /> Save Changes
                    </button>
                  </form>
                </details>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
