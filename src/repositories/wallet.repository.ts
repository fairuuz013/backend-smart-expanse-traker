// 1. Ubah import dari 'database' ke 'generated'
import { PrismaClient } from '../generated';

export class WalletRepository {
  // 2. Gunakan Constructor Injection
  // (PrismaClient dikirim dari luar, bukan import langsung di sini)
  constructor(private prisma: PrismaClient) {}

  async findAll(userId: string) {
    // 3. Pakai 'this.prisma' bukan 'prisma' global
    return await this.prisma.wallet.findMany({
      where: { 
        user_id: userId,
        deleted_at: null 
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async findById(id: string) {
    return await this.prisma.wallet.findFirst({ 
      where: { 
        id,
        deleted_at: null 
      }
    });
  }

  async create(data: { name: string; type: string; balance: number; user_id: string }) {
    return await this.prisma.wallet.create({
      data
    });
  }

  async update(id: string, data: { name?: string; type?: string; balance?: number }) {
    return await this.prisma.wallet.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await this.prisma.wallet.update({
      where: { id },
      data: {
        deleted_at: new Date()
      }
    });
  }
}