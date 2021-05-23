import { useRouter } from "next/router";
import useSWR from "swr";

export default function user() {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);

  if (error) router.push("/");

  if (data) console.log(data);

  return <div></div>;
}
