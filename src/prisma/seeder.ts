import prisma from '../database';
import { TransactionType, UserRole, OtpType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

class DatabaseSeeder {
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public async run() {
    console.log("🚀 Memulai proses seeding...");

    // ==========================================
    // 1. CLEANUP (Hapus data lama)
    // ==========================================
    try {
      // Hapus tabel child dulu baru parent (Reverse Order)
      await prisma.attachment.deleteMany();
      await prisma.transaction.deleteMany();
      await prisma.budget.deleteMany();
      await prisma.activityLog.deleteMany();
      await prisma.notification.deleteMany();
      await prisma.otp.deleteMany();
      await prisma.refreshToken.deleteMany();
      await prisma.passwordReset.deleteMany();
      await prisma.wallet.deleteMany();
      
      // PERUBAHAN 1: Hapus Profile dulu sebelum User
      await prisma.profile.deleteMany(); 
      await prisma.user.deleteMany();
      
      await prisma.category.deleteMany(); // Hapus kategori
      console.log("🧹 Database berhasil dibersihkan.");
    } catch (error) {
      console.log("⚠️  Gagal membersihkan database (mungkin tabel kosong), lanjut seeding...");
    }

    const password = await this.hashPassword("password123");

    // ==========================================
    // 2. SEED GLOBAL CATEGORIES
    // ==========================================
    // Karena user_id di Category nullable (?), kita bisa buat tanpa user_id
    console.log("🌱 Seeding Categories...");
    const catGaji = await prisma.category.create({ data: { name: 'Gaji', type: TransactionType.INCOME } });
    const catBonus = await prisma.category.create({ data: { name: 'Bonus', type: TransactionType.INCOME } });
    
    const catMakan = await prisma.category.create({ data: { name: 'Makanan', type: TransactionType.EXPENSE } });
    const catTransport = await prisma.category.create({ data: { name: 'Transportasi', type: TransactionType.EXPENSE } });
    const catBelanja = await prisma.category.create({ data: { name: 'Belanja', type: TransactionType.EXPENSE } });

    // ==========================================
    // 3. SEED USERS, PROFILES & RELATIONS
    // ==========================================
    console.log("🌱 Seeding Users, Profiles, Wallets & Data Lainnya...");

    for (let i = 0; i < 5; i++) {
      // --- A. Create USER + PROFILE (Nested Write) ---
      // PERUBAHAN 2: Menambahkan data Profile di sini
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = `${firstName.toLowerCase()}${faker.string.numeric(3)}`; // Username unik

      const user = await prisma.user.create({
        data: {
          full_name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }),
          password: password,
          role: i === 0 ? UserRole.ADMIN : UserRole.USER,
          
          // INI LOGIKA BARU UNTUK PROFILE:
          profile: {
            create: {
              username: username,
              address: faker.location.streetAddress(),
              occupation: faker.person.jobTitle(),
              // Menggunakan mode 'age' agar umur logis (18-60 tahun)
              date_of_birth: faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
            }
          }
        },
        include: {
          profile: true // Include profile agar kita bisa lihat log-nya kalau perlu
        }
      });

      // --- B. Create WALLETS ---
      const walletCash = await prisma.wallet.create({
        data: { name: "Dompet Tunai", balance: 1000000, type: "CASH", user_id: user.id }
      });
      const walletBank = await prisma.wallet.create({
        data: { name: "Bank BCA", balance: 50000000, type: "BANK", user_id: user.id }
      });

      // --- C. Create BUDGET ---
      await prisma.budget.create({
        data: {
          monthly_limit: 5000000,
          month_year: new Date(),
          user_id: user.id
        }
      });

      // --- D. Create REFRESH TOKEN ---
      await prisma.refreshToken.create({
        data: {
          token: faker.string.uuid(),
          expires_at: faker.date.future(),
          user_id: user.id
        }
      });

      // --- E. Create OTP ---
      await prisma.otp.create({
        data: {
          code: faker.string.numeric(6),
          type: OtpType.REGISTRATION, 
          expired_at: faker.date.recent(),
          user_id: user.id
        }
      });

      // --- F. Create NOTIFICATION ---
      await prisma.notification.createMany({
        data: [
          {
            user_id: user.id,
            title: "Selamat Datang!",
            content: `Halo ${username}, selamat bergabung di Smart Expense Tracker!`,
            is_read: true
          },
          {
            user_id: user.id,
            title: "Info",
            content: "Lengkapi data profil Anda untuk pengalaman lebih baik.",
            is_read: false
          }
        ]
      });

      // --- G. Create PASSWORD RESET (Hanya user ke-2) ---
      if (i === 1) {
        await prisma.passwordReset.create({
          data: {
            email: user.email,
            token: faker.string.alphanumeric(20)
          }
        });
      }

      // --- H. Create ACTIVITY LOG ---
      await prisma.activityLog.create({
        data: {
          user_id: user.id,
          action: "REGISTER",
          description: "User berhasil mendaftar"
        }
      });

      // --- I. Create TRANSACTIONS ---
      // Kita gunakan Kategori Global yang dibuat di atas (catMakan, catTransport, dll)
      await prisma.transaction.createMany({
        data: [
          {
            amount: 25000,
            note: "Makan Siang Warteg",
            type: TransactionType.EXPENSE,
            transaction_date: faker.date.recent(),
            user_id: user.id,
            wallet_id: walletCash.id,
            category_id: catMakan.id
          },
          {
            amount: 15000,
            note: "Ojek Online ke Kantor",
            type: TransactionType.EXPENSE,
            transaction_date: faker.date.recent(),
            user_id: user.id,
            wallet_id: walletCash.id,
            category_id: catTransport.id
          },
          {
            amount: 750000,
            note: "Belanja Bulanan Superindo",
            type: TransactionType.EXPENSE,
            transaction_date: faker.date.past(),
            user_id: user.id,
            wallet_id: walletBank.id,
            category_id: catBelanja.id
          },
          {
            amount: 8000000,
            note: "Gaji Pokok",
            type: TransactionType.INCOME,
            transaction_date: faker.date.past(),
            user_id: user.id,
            wallet_id: walletBank.id,
            category_id: catGaji.id
          },
          {
            amount: 1500000,
            note: "Bonus Lembur",
            type: TransactionType.INCOME,
            transaction_date: faker.date.recent(),
            user_id: user.id,
            wallet_id: walletBank.id,
            category_id: catBonus.id
          }
        ]
      });

      // --- J. Attachment (Struk untuk transaksi terakhir) ---
      const lastTrx = await prisma.transaction.findFirst({
        where: { user_id: user.id },
        orderBy: { transaction_date: 'desc' }
      });

      if (lastTrx) {
        await prisma.attachment.create({
          data: {
            transaction_id: lastTrx.id,
            file_path: "uploads/struk-dummy.jpg",
            file_type: "image/jpeg"
          }
        });
      }
    }

    console.log("🌳 SEEDING SELESAI! Data dummy (termasuk Profile) siap digunakan.");
  }
}

new DatabaseSeeder().run()
  .catch(e => {
    console.error("❌ Error Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });