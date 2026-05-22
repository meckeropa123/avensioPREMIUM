import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export type SessionUser = { sub: string; role: string; email: string };

export async function getSessionUser(): Promise<SessionUser | null> {
  const h = await headers();
  const auth = h.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    return {
      ok: false as const,
      response: Response.json(
        {
          message:
            "Для изменения данных войдите или зарегистрируйтесь. Browsing доступен без аккаунта."
        },
        { status: 401 }
      )
    };
  }
  return { ok: true as const, user };
}
