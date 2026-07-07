import { revalidatePath } from "next/cache";
import { Coffee, Plus, Save, Trash2 } from "lucide-react";
import { getPrisma } from "@/lib/db";

const categories = [
  "Signature Sips",
  "Seasonal",
  "Pastries",
  "Coffee Bar",
  "Non-Coffee",
];

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
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

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
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

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
}

async function deleteMenuItem(formData: FormData) {
  "use server";

  const id = getString(formData, "id");
  const prisma = getPrisma();

  await prisma.menuItem.delete({
    where: { id },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
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
  "h-12 w-full rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 text-sm text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#4A342A]/60";

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
            Add drinks, pastries, prices, images, featured status, and visibility from the dashboard.
          </p>
        </div>
        <div className="rounded-full bg-[#FFFDFB] px-5 py-3 text-sm font-bold text-[#4A342A]/70 shadow-[0_14px_50px_rgba(43,30,24,0.06)]">
          {menuItems.length} database item{menuItems.length === 1 ? "" : "s"}
        </div>
      </div>

      <section className="mt-10 rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)] sm:p-8">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
            <Plus size={26} />
          </div>
          <div>
            <h2 className="font-[var(--font-display)] text-3xl font-semibold">
              Add new menu item
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4A342A]/70">
              Use image URLs from your public assets, Cloudinary, or another image host.
            </p>
          </div>
        </div>

        <form action={createMenuItem} className="grid gap-5 lg:grid-cols-2">
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
          <div className="lg:col-span-2">
            <label htmlFor="new-description" className={labelClass}>Description</label>
            <textarea
              id="new-description"
              name="description"
              required
              rows={3}
              className="w-full resize-none rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 py-4 text-sm leading-7 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
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
          <div className="flex flex-wrap gap-4 lg:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl bg-[#F8F4EF] px-4 py-3 text-sm font-semibold text-[#4A342A]/75">
              <input type="checkbox" name="active" defaultChecked /> Active
            </label>
            <label className="flex items-center gap-3 rounded-2xl bg-[#F8F4EF] px-4 py-3 text-sm font-semibold text-[#4A342A]/75">
              <input type="checkbox" name="featured" /> Featured
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#2B1E18] px-8 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] lg:col-span-2"
          >
            <Plus className="mr-2" size={18} /> Add Item
          </button>
        </form>
      </section>

      <section className="mt-10 space-y-5">
        {menuItems.length === 0 ? (
          <div className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-8 text-[#4A342A]/75 shadow-[0_18px_70px_rgba(43,30,24,0.06)]">
            No database menu items yet. Add your first item above.
          </div>
        ) : (
          menuItems.map((item) => (
            <article key={item.id} className="rounded-[2rem] border border-[#2B1E18]/10 bg-[#FFFDFB] p-6 shadow-[0_18px_70px_rgba(43,30,24,0.06)] sm:p-8">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#B7793C]/15 text-[#B7793C]">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B7793C]">{item.category}</p>
                    <h2 className="mt-2 font-[var(--font-display)] text-3xl font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#4A342A]/60">
                      {item.active ? "Visible" : "Hidden"} · {item.featured ? "Featured" : "Standard"}
                    </p>
                  </div>
                </div>
                <form action={deleteMenuItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#9B3A2F]/20 px-5 text-sm font-semibold text-[#9B3A2F] transition hover:bg-[#9B3A2F]/10"
                  >
                    <Trash2 className="mr-2" size={16} /> Delete
                  </button>
                </form>
              </div>

              <form action={updateMenuItem} className="grid gap-5 lg:grid-cols-2">
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
                <div className="lg:col-span-2">
                  <label htmlFor={`${item.id}-description`} className={labelClass}>Description</label>
                  <textarea
                    id={`${item.id}-description`}
                    name="description"
                    required
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-[#2B1E18]/10 bg-[#F8F4EF] px-4 py-4 text-sm leading-7 text-[#2B1E18] transition placeholder:text-[#4A342A]/40 focus:border-[#B7793C] focus:bg-[#FFFDFB] focus:outline-none"
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
                <div className="flex flex-wrap gap-4 lg:col-span-2">
                  <label className="flex items-center gap-3 rounded-2xl bg-[#F8F4EF] px-4 py-3 text-sm font-semibold text-[#4A342A]/75">
                    <input type="checkbox" name="active" defaultChecked={item.active} /> Active
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl bg-[#F8F4EF] px-4 py-3 text-sm font-semibold text-[#4A342A]/75">
                    <input type="checkbox" name="featured" defaultChecked={item.featured} /> Featured
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#2B1E18] px-7 text-sm font-semibold text-[#FFFDFB] transition hover:bg-[#4A342A] lg:col-span-2"
                >
                  <Save className="mr-2" size={17} /> Save Changes
                </button>
              </form>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
