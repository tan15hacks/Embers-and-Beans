import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Coffee, Filter, Plus, Save, Sparkles, Trash2 } from "lucide-react";
import { menuSections } from "@/data/menu";
import { getPrisma } from "@/lib/db";
import { normalizePesoInput } from "@/lib/money";

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
    price: normalizePesoInput(item.price),
    category: section.title,
    image: item.image ?? null,
    imageAlt: item.imageAlt ?? null,
    sortOrder: index,
    featured: section.title === "Signature Sips",
    active: true,
  })),
);

type MenuFilters = {
  q?: string;
  category?: string;
  status?: string;
  featured?: string;
};

type AdminMenuPageProps = {
  searchParams?: Promise<MenuFilters>;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getPrice(formData: FormData) {
  return normalizePesoInput(getString(formData, "price"));
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

function revalidateMenuPaths() {
  revalidatePath("/admin/menu");
  revalidatePath("/admin/dashboard");
  revalidatePath("/menu");
  revalidatePath("/order");
  revalidatePath("/");
}

function matchesFilters(
  item: Awaited<ReturnType<typeof getMenuItems>>[number],
  filters: MenuFilters,
) {
  const query = filters.q?.trim().toLowerCase() ?? "";
  const category = filters.category ?? "all";
  const status = filters.status ?? "all";
  const featured = filters.featured ?? "all";

  const matchesQuery =
    query.length === 0 ||
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.price.toLowerCase().includes(query);

  const matchesCategory = category === "all" || item.category === category;
  const matchesStatus =
    status === "all" ||
    (status === "active" && item.active) ||
    (status === "hidden" && !item.active);
  const matchesFeatured =
    featured === "all" ||
    (featured === "featured" && item.featured) ||
    (featured === "standard" && !item.featured);

  return matchesQuery && matchesCategory && matchesStatus && matchesFeatured;
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
      price: getPrice(formData),
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
      price: getPrice(formData),
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

export default async function AdminMenuPage({ searchParams }: AdminMenuPageProps) {
  const filters = (await searchParams) ?? {};
  const allMenuItems = await getMenuItems();
  const menuItems = allMenuItems.filter((item) => matchesFilters(item, filters));
  const hasFilters = Boolean(filters.q || filters.category || filters.status || filters.featured);

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
            Type prices as plain numbers like 150. The system automatically stores and displays them as Philippine peso amounts.
          </p>
        </div>
        <div className="rounded-full bg-[#FFFDFB] px-5 py-3 text-sm font-bold text-[#4A342A]/70 shadow-[0_14px_50px_rgba(43,30,24,0.06)]">
          Showing {menuItems.length} of {allMenuItems.length}
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
              <label htmlFor="new-price" className={labelClass}>Price PHP</label>
              <input id="new-price" name="price" required inputMode="numeric" className={inputClass} placeholder="185" />
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
              <textarea id="new-description" name="description" required rows={3} className="w-full resize-none rounded-xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-3 py-3 text-sm leading-6 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none" placeholder="Espresso, oat milk, wildflower honey, cinnamon." />
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
            <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:col-span-2">
              <Plus className="mr-2" size={17} /> Add Item
            </button>
          </form>
        </details>
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-5 shadow-[0_18px_70px_rgba(43,30,24,0.05)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
            <Filter size={19} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B7793C]">Filters</p>
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Find menu items fast</h2>
          </div>
        </div>

        <form className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.75fr_0.75fr_auto_auto] lg:items-end" method="get">
          <div>
            <label htmlFor="q" className={labelClass}>Search</label>
            <input id="q" name="q" className={inputClass} defaultValue={filters.q ?? ""} placeholder="Latte, croissant, 185..." />
          </div>
          <div>
            <label htmlFor="category-filter" className={labelClass}>Category</label>
            <select id="category-filter" name="category" className={inputClass} defaultValue={filters.category ?? "all"}>
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status-filter" className={labelClass}>Visibility</label>
            <select id="status-filter" name="status" className={inputClass} defaultValue={filters.status ?? "all"}>
              <option value="all">All</option>
              <option value="active">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <div>
            <label htmlFor="featured-filter" className={labelClass}>Type</label>
            <select id="featured-filter" name="featured" className={inputClass} defaultValue={filters.featured ?? "all"}>
              <option value="all">All</option>
              <option value="featured">Featured</option>
              <option value="standard">Standard</option>
            </select>
          </div>
          <button type="submit" className="h-11 rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A]">
            Apply
          </button>
          {hasFilters ? (
            <Link href="/admin/menu" className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B1E18]/10 px-6 text-sm font-semibold text-[#4A342A]/70 transition hover:bg-[#F8F4EF]">
              Reset
            </Link>
          ) : null}
        </form>
      </section>

      <section className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#2B1E18]/10 bg-[#FFFDFB] shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
        <div className="border-b border-[#2B1E18]/10 px-5 py-4">
          <div className="hidden grid-cols-[1.4fr_0.9fr_0.5fr_0.8fr_0.85fr] gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A342A]/50 lg:grid">
            <span>Item</span>
            <span>Category</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold lg:hidden">Menu items</h2>
        </div>

        {allMenuItems.length === 0 ? (
          <div className="p-6 text-[#4A342A]/75">No database menu items yet. Import the starter menu above or add your first item manually.</div>
        ) : menuItems.length === 0 ? (
          <div className="p-6 text-[#4A342A]/75">No items match the current filters. Reset filters or try a different search.</div>
        ) : (
          <div className="divide-y divide-[#2B1E18]/10">
            {menuItems.map((item) => (
              <details key={item.id} className="group">
                <summary className="grid cursor-pointer list-none gap-4 px-5 py-4 transition hover:bg-[#F8F4EF]/70 lg:grid-cols-[1.4fr_0.9fr_0.5fr_0.8fr_0.85fr] lg:items-center [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/12 text-[#B7793C]"><Coffee size={18} /></div>
                      <div className="min-w-0">
                        <h3 className="truncate font-[var(--font-display)] text-2xl font-semibold leading-tight">{item.name}</h3>
                        <p className="mt-1 hidden truncate text-sm text-[#4A342A]/60 md:block">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-[#F8F4EF] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#4A342A]/65">{item.category}</span>
                  <span className="font-semibold text-[#2B1E18]">{normalizePesoInput(item.price)}</span>

                  <div className="flex flex-wrap gap-2">
                    <span className={`${statusBadgeClass} ${item.active ? "bg-[#6E7A5C]/15 text-[#4F5F3F]" : "bg-[#9B3A2F]/10 text-[#9B3A2F]"}`}>{item.active ? "Visible" : "Hidden"}</span>
                    {item.featured && <span className={`${statusBadgeClass} bg-[#B7793C]/15 text-[#B7793C]`}>Featured</span>}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <span className="inline-flex h-10 items-center justify-center rounded-full bg-[#2B1E18] px-4 text-sm font-semibold text-[#FFFDFB] transition group-open:bg-[#B7793C]">Edit</span>
                    <form action={deleteMenuItem}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="inline-flex h-10 items-center justify-center rounded-full border border-[#9B3A2F]/20 px-4 text-sm font-semibold text-[#9B3A2F] transition hover:bg-[#9B3A2F]/10">
                        <Trash2 className="mr-2" size={15} /> Delete
                      </button>
                    </form>
                  </div>
                </summary>

                <div className="border-t border-[#2B1E18]/10 bg-[#F8F4EF] px-5 py-5">
                  <form action={updateMenuItem} className="grid gap-4 md:grid-cols-2">
                    <input type="hidden" name="id" value={item.id} />
                    <div>
                      <label htmlFor={`${item.id}-name`} className={labelClass}>Name</label>
                      <input id={`${item.id}-name`} name="name" required className={inputClass} defaultValue={item.name} />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-price`} className={labelClass}>Price PHP</label>
                      <input id={`${item.id}-price`} name="price" required inputMode="numeric" className={inputClass} defaultValue={item.price.replace(/[^0-9.]/g, "")} />
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-category`} className={labelClass}>Category</label>
                      <select id={`${item.id}-category`} name="category" className={inputClass} defaultValue={item.category}>
                        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${item.id}-sort`} className={labelClass}>Sort order</label>
                      <input id={`${item.id}-sort`} name="sortOrder" type="number" className={inputClass} defaultValue={item.sortOrder} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor={`${item.id}-description`} className={labelClass}>Description</label>
                      <textarea id={`${item.id}-description`} name="description" required rows={3} className="w-full resize-none rounded-xl border border-[#2B1E18]/10 bg-[#FFFDFB] px-3 py-3 text-sm leading-6 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:outline-none" defaultValue={item.description} />
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
                      <label className="flex items-center gap-2 rounded-xl bg-[#FFFDFB] px-3 py-2 text-sm font-semibold text-[#4A342A]/75"><input type="checkbox" name="active" defaultChecked={item.active} /> Active</label>
                      <label className="flex items-center gap-2 rounded-xl bg-[#FFFDFB] px-3 py-2 text-sm font-semibold text-[#4A342A]/75"><input type="checkbox" name="featured" defaultChecked={item.featured} /> Featured</label>
                    </div>
                    <button type="submit" className="inline-flex h-11 items-center justify-center rounded-full bg-[#2B1E18] px-6 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] md:col-span-2"><Save className="mr-2" size={16} /> Save Changes</button>
                  </form>

                  <form action={deleteMenuItem} className="mt-4 border-t border-[#2B1E18]/10 pt-4">
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="inline-flex h-10 items-center justify-center rounded-full border border-[#9B3A2F]/20 px-5 text-sm font-semibold text-[#9B3A2F] transition hover:bg-[#9B3A2F]/10"><Trash2 className="mr-2" size={15} /> Delete Item</button>
                  </form>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
