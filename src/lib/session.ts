import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

type SessionPayload = {
  userId: string;
  expireAt: Date;
};

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const cookiesStore = await cookies();

  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, expireAt });

  cookiesStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expireAt,
  });
}

export async function deleteSession() {
  const cookiesStore = await cookies();
  cookiesStore.delete('session');
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Failed to verify session');
  }
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}
