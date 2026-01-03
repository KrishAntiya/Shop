import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { query } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRY = '7d'

export interface AdminUser {
  id: number
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  )
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser
    return decoded
  } catch (error) {
    return null
  }
}

export async function getAdminFromToken(token: string): Promise<AdminUser | null> {
  const user = verifyToken(token)
  if (!user) return null

  // Verify user still exists in database
  const results = await query('SELECT id, email, role FROM admins WHERE id = ?', [user.id]) as any[]
  if (results.length === 0) return null

  return {
    id: results[0].id,
    email: results[0].email,
    role: results[0].role,
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Check cookie
  const token = request.cookies.get('admin_token')?.value
  return token || null
}

export async function requireAuth(
  request: NextRequest
): Promise<{ user: AdminUser } | NextResponse> {
  const token = getTokenFromRequest(request)
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await getAdminFromToken(token)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return { user }
}

