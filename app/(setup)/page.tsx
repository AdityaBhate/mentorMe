import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { initialProfile } from "@/lib/intial-profile";

async function SetupPage() {
	const profile = await initialProfile();

	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	if (server) {
		return redirect(`/server/${server.id}`);
	}

	return <div>Create a server</div>;
}

export default SetupPage;
