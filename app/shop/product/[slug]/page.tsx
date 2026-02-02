import { redirect } from "next/navigation";

type Props = { params: { slug: string } };

// Safety net redirect for legacy /shop/product/* URLs
// Primary redirect handled by Netlify edge, this catches local dev and edge cases
export default function LegacyShopProductRedirect({ params }: Props) {
  redirect(`/store/products/${encodeURIComponent(params.slug)}`);
}
