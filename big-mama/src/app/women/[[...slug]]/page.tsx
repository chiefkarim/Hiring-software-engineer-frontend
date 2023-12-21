export default function Women({ params }: { params: { slug: string[] } }) {
  if (params?.slug?.length > 0) {
    return (
      <main className=" flex min-h-screen flex-col items-center justify-between p-24">
        <h1>hello from women&#39;s collection {params.slug[0]} </h1>
      </main>
    );
  } else {
    return (
      <main className=" flex min-h-screen flex-col items-center justify-between p-24">
        <h1>hello from women&#39;s collection </h1>
      </main>
    );
  }
}
