export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Avensio Marketplace MVP</h1>
      <p>SSR-first storefront with RBAC, cart, orders, payments, and delivery integrations scaffold.</p>
      <ul className="list-disc pl-5">
        <li>/api/products</li><li>/api/auth/login</li><li>/api/payments/create</li><li>/api/delivery/calculate</li>
      </ul>
    </div>
  );
}
