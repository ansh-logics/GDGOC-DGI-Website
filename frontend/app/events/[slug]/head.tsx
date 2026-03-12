import getSpecificEvent from "@/app/api/controllers/getSpecificEvent";

type HeadProps = {
  params: { slug: string };
};

export default async function Head({ params }: HeadProps) {
  const event = await getSpecificEvent(params.slug);

  const baseTitle = "GDG on Campus Dronacharya";
  const title = event ? `${event.title} | ${baseTitle}` : `Event | ${baseTitle}`;

  const description =
    (event && (event.summary || event.description)) ||
    "Join GDG on Campus Dronacharya for community-driven tech events, workshops, and meetups.";

  const image =
    event?.bannerUrl || event?.thumbnailUrl || "/og-image.png";

  const url = `https://www.gdgdronacharya.site/events/${encodeURIComponent(
    params.slug
  )}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

