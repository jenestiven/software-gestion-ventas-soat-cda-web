import { NextResponse } from 'next/server';
import { db, admin } from '@/firebase/firebaseAdmin'; // Importa 'admin' también

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json();

    // Validaciones de los datos de entrada
    if (!email || !password || !displayName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // 1. Crear el usuario en Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // 2. Guardar información adicional del usuario en Firestore
    const usersCollection = db.collection('users');
    await usersCollection.doc(userRecord.uid).set({
      email: userRecord.email,
      displayName: userRecord.displayName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      // Puedes añadir más campos aquí si los necesitas
    });

    return NextResponse.json(
      { message: 'User created successfully', uid: userRecord.uid },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user:', error);

    // Manejo de errores específicos de Firebase Authentication
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    } else if (error.code === 'auth/invalid-password') {
      return NextResponse.json({ message: 'Password should be at least 6 characters' }, { status: 400 });
    } else if (error.code === 'auth/invalid-email') {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
