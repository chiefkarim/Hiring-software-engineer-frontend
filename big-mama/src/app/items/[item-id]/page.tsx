export default function item({ params }: { params: { "item-id": string } }) {
  return (
    <main className="lex min-h-screen flex-col items-center justify-between p-24">
      <h1>item id: {params["item-id"]}</h1>
    </main>
  );
}
