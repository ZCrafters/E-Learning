'use client'

import { useState } from 'react'
import { ModuleHeader } from './module-header'
import { KPICards } from './kpi-cards'
import { ProgressTracker } from './progress-tracker'
import { ChapterAccordion } from './chapter-accordion'
import { TheoryCard } from './theory-card'
import { IdentityCards } from './identity-cards'
import { InsightBox } from './insight-box'
import { ComparisonTable } from './comparison-table'
import { ExampleCard } from './example-card'
import { MaturityLevels } from './maturity-levels'
import { ScriptBox } from './script-box'
import { MatrixGrid } from './matrix-grid'
import { Checklist } from './checklist'
import { StepList } from './step-list'
import { FunnelChart } from './funnel-chart'
import { PointCard } from './point-card'
import { TierList } from './tier-list'
import { RiskCards } from './risk-cards'
import { WarningList } from './warning-list'
import { KPILink } from './kpi-link'
import { DataGrid } from './data-grid'
import { HighlightBox } from './highlight-box'

const kpiItems = [
  {
    label: 'AF Partnership',
    value: 'Rp 300 Jt',
    description: 'Target pencairan/bulan',
    color: 'blue' as const,
  },
  {
    label: 'Komunitas Aktif',
    value: '35%',
    description: 'Rutin kirim leads',
    color: 'green' as const,
  },
  {
    label: 'Leads to Order',
    value: '50%',
    description: '5 dari 10 leads layak',
    color: 'orange' as const,
  },
  {
    label: 'R1 / R3M',
    value: '5% / 25%',
    description: 'Batas tunggak maks.',
    color: 'pink' as const,
  },
]

const identityItems = [
  {
    icon: 'SP',
    title: 'Strategic Partner',
    description: 'Membangun kolam leads melalui jaringan komunitas. Bukan berburu satu per satu setiap hari.',
    bgColor: '#E6F1FB',
    iconColor: '#185FA5',
  },
  {
    icon: 'BB',
    title: 'Bridge Builder',
    description: 'Jembatan FINATRA dan masyarakat. Kepercayaan komunitas kepada perusahaan dimulai dari kepercayaan mereka kepadamu.',
    bgColor: '#E1F5EE',
    iconColor: '#0F6E56',
  },
  {
    icon: 'QC',
    title: 'Quality Controller',
    description: 'Filter karakter dan kapasitas. Setiap nama yang masuk adalah hasil seleksi, bukan sekadar angka.',
    bgColor: '#FAEEDA',
    iconColor: '#854F0B',
  },
]

const comparisonRows = [
  { dimensi: 'Model kerja', sales: 'bad Door-to-door, linear', pao: 'good Network-based, eksponensial' },
  { dimensi: 'Sumber leads', sales: 'bad Tenaga sendiri setiap hari', pao: 'good Mitra komunitas yang aktif mengirim' },
  { dimensi: 'Ketika libur/cuti', sales: 'bad Leads berhenti total', pao: 'good Komunitas tetap menghasilkan' },
  { dimensi: 'Kualitas nasabah', sales: 'bad Tidak terfilter, R1 tinggi', pao: 'good Sudah direkomendasikan, R1 rendah' },
  { dimensi: 'Hubungan nasabah', sales: 'bad Transaksional, putus setelah cair', pao: 'good Relasional, nasabah loyal & referral' },
  { dimensi: 'Risiko kredit', sales: 'bad Tinggi — karakter tidak dikenal', pao: 'good Rendah — ada kontrol sosial komunitas' },
  { dimensi: 'Skalabilitas', sales: 'bad Terbatas kapasitas personal', pao: 'good Skalabel melalui jaringan komunitas' },
  { dimensi: 'Burnout risk', sales: 'bad Tinggi — energi habis di prospecting', pao: 'good Rendah — energi untuk relasi strategis' },
  { dimensi: 'Pendekatan mitra', sales: 'bad Tidak ada, langsung ke nasabah', pao: 'good Bangun hubungan dengan Gatekeeper dulu' },
  { dimensi: 'Ketika ada macet', sales: 'bad Harus kejar sendiri', pao: 'good Mitra komunitas membantu mengingatkan' },
]

const maturityLevels = [
  {
    title: 'Level 1 — Pemula',
    items: ['Masih fokus door-to-door', 'Belum punya komunitas aktif', 'Leads to Order di bawah 30%', 'R1 sering di atas 10%', 'Tidak rutin isi digital form'],
    color: '#791F1F',
    bgColor: '#FCEBEB',
  },
  {
    title: 'Level 2 — Berkembang',
    items: ['Sudah punya 3–5 komunitas', 'Mulai rutin kunjungi mitra', 'Leads to Order 30–45%', 'R1 antara 5–8%', 'Isi form tapi tidak konsisten'],
    color: '#854F0B',
    bgColor: '#FAEEDA',
  },
  {
    title: 'Level 3 — Mature',
    items: ['Sistem komunitas berjalan sendiri', 'Komunitas aktif ≥35% dari total', 'Leads to Order konsisten ≥50%', 'R1 selalu di bawah 5%', 'Mitra aktif monitor nasabah'],
    color: '#3B6D11',
    bgColor: '#EAF3DE',
  },
]

const matrixItems = [
  {
    badge: '🥇 Prioritas 1',
    badgeColor: '#fff',
    badgeBgColor: '#3B6D11',
    title: 'High Potential + High Trust',
    description: 'RT/RW dengan UMKM aktif dan ketua yang terbuka. Eksekusi sekarang.',
    items: ['Kunjungi minggu ini', 'Target leads bulan ini', 'Potensi AF tertinggi'],
    bgColor: '#EAF3DE',
    textColor: '#27500A',
  },
  {
    badge: '🥈 Prioritas 2',
    badgeColor: '#fff',
    badgeBgColor: '#BA7517',
    title: 'High Potential + Low Trust',
    description: 'Komunitas besar, belum kenal FINATRA. Mulai edukasi sekarang.',
    items: ['Kunjungi 2–3x sebelum minta leads', 'Target leads bulan 2', 'Butuh skrip edukasi khusus'],
    bgColor: '#FAEEDA',
    textColor: '#633806',
  },
  {
    badge: '🥉 Prioritas 3',
    badgeColor: '#fff',
    badgeBgColor: '#378ADD',
    title: 'Low Potential + High Trust',
    description: 'Kecil tapi sudah percaya. Kelola efisien, jangan diabaikan.',
    items: ['Kunjungan 1x/bulan cukup', 'Leads volume kecil tapi kualitas baik', 'Bisa jadi referral ke komunitas lain'],
    bgColor: '#E6F1FB',
    textColor: '#185FA5',
  },
  {
    badge: '⏸ Tunda',
    badgeColor: '#fff',
    badgeBgColor: '#E24B4A',
    title: 'Low Potential + Low Trust',
    description: 'ROI sangat rendah. Fokus ke prioritas lebih tinggi dulu.',
    items: ['Review ulang setelah 3 bulan', 'Masuk daftar cadangan saja', 'Jangan habiskan energi di sini'],
    bgColor: '#FCEBEB',
    textColor: '#791F1F',
  },
]

const goldCommunityCriteria = [
  'Ada perputaran uang harian — pedagang, warung, jasa, bengkel, atau usaha produktif lainnya',
  'Memiliki pemimpin yang aktif, dipercaya, dan mudah ditemui (Ketua RT, Kades, Pengurus Koperasi)',
  'Anggota berusia produktif (25–55 tahun) dengan mayoritas sudah memiliki usaha yang berjalan',
  'Ada kegiatan rutin komunitas (rapat RT, arisan, pengajian, pertemuan koperasi) — memudahkan sosialisasi sekaligus',
  'Belum atau jarang dijangkau kompetitor fintech/leasing lain — blue ocean opportunity',
  'Komunitas memiliki rasa kebersamaan yang kuat — anggota saling peduli dan saling mengingatkan',
  'Ketua komunitas tidak memiliki konflik kepentingan (tidak aktif di leasing kompetitor)',
  'Lokasi terjangkau — dapat dikunjungi rutin 2x/bulan tanpa memakan terlalu banyak waktu perjalanan',
]

const lobbyingSteps = [
  {
    number: 1,
    title: 'Pertemuan pertama — datang untuk mendengar, bukan menawarkan',
    description: 'Tujuan pertemuan pertama adalah membangun rapport, bukan closing. Tanyakan: "Apa tantangan terbesar warga Bapak/Ibu dalam mengembangkan usaha?" dan dengarkan dengan sungguh-sungguh. Catat poin-poin penting untuk dibawa ke pertemuan berikutnya.',
  },
  {
    number: 2,
    title: 'Pertemuan kedua — tawarkan solusi spesifik untuk masalah yang disampaikan',
    description: 'Referensikan poin yang disampaikan di pertemuan pertama: "Bapak/Ibu bilang banyak warga yang butuh modal untuk beli stok barang — nah, FINATRA punya program yang tepat untuk itu." Personalisasi solusi jauh lebih kuat dari penawaran generik.',
  },
  {
    number: 3,
    title: 'Jelaskan benefit konkret bagi komunitas dan ketua',
    description: 'Ketua perlu merasakan manfaat langsung: skema success fee, kemungkinan program CSR untuk komunitas, peningkatan kuota pinjaman bagi komunitas yang performanya baik. Ini membuat kerjasama terasa saling menguntungkan, bukan satu arah.',
  },
  {
    number: 4,
    title: 'Minta waktu sosialisasi di pertemuan rutin komunitas',
    description: 'Minta 15–20 menit di rapat RT, arisan, atau pertemuan koperasi berikutnya. Pastikan Ketua hadir dan membuka dengan endorsement: "Ini mitra kita dari FINATRA yang mau bantu warga yang butuh modal usaha." Endorsement ketua adalah Trust Transfer yang paling kuat.',
  },
  {
    number: 5,
    title: 'Bangun rutinitas kunjungan — jaga hubungan tetap hangat',
    description: 'Minimal 2 kunjungan per bulan. Di kunjungan non-sosialisasi: bawa kabar baik (update nasabah yang usahanya berkembang), tanyakan perkembangan komunitas, atau sekadar silaturahmi. Ketua yang merasa dihargai akan terus aktif merekomendasikan.',
  },
]

const funnelStages = [
  { label: 'A — Awareness', description: 'Sosialisasi — seluruh komunitas', percentage: 100, color: '#E6F1FB', textColor: '#185FA5' },
  { label: 'I — Interest', description: 'Leads yang mau mendaftar', percentage: 72, color: '#FAEEDA', textColor: '#854F0B' },
  { label: 'D — Decision', description: 'Lolos First Screening (target)', percentage: 50, color: '#F5C4B3', textColor: '#993C1D' },
  { label: 'A — Action (AF)', description: 'Cair — disbursement aktual', percentage: 35, color: '#9FE1CB', textColor: '#085041' },
]

const screeningFramework = [
  {
    icon: 'C1',
    title: 'Cek Karakter',
    description: 'Reputasi di lingkungan — tanya Ketua RT secara langsung. Riwayat pinjam-meminjam dengan tetangga/kerabat. Keaktifan di kegiatan komunitas (tanda tanggung jawab). Riwayat pembayaran arisan atau cicilan lain.',
  },
  {
    icon: 'C2',
    title: 'Cek Kapasitas',
    description: 'Usaha sudah berjalan minimal 6 bulan (bukan rencana). Ada bukti fisik — toko, lapak, peralatan kerja, stok barang. Ada cashflow harian yang bisa diestimasi. Tujuan pinjaman produktif (modal kerja/ekspansi).',
  },
]

const customerTiers = [
  {
    badge: 'A',
    badgeColor: '#3B6D11',
    badgeBgColor: '#EAF3DE',
    title: 'Tipe Ideal — Fast Track, Prioritaskan',
    description: 'UMKM berjalan 1+ tahun dengan omzet stabil, reputasi sangat baik di komunitas, tujuan pinjaman jelas untuk modal kerja atau ekspansi, memiliki rekening aktif dan riwayat transaksi yang bisa diverifikasi. Cicilan ≤25% dari estimasi pendapatan bulanan.',
    tags: [
      { label: 'Proses cepat', color: '#3B6D11', bgColor: '#EAF3DE' },
      { label: 'R1 sangat rendah', color: '#085041', bgColor: '#E1F5EE' },
      { label: 'Potensi repeat order', color: '#185FA5', bgColor: '#E6F1FB' },
    ],
  },
  {
    badge: 'B',
    badgeColor: '#854F0B',
    badgeBgColor: '#FAEEDA',
    title: 'Tipe Potensial — Verifikasi Lebih Dalam',
    description: 'Usaha berjalan 3–6 bulan, reputasi baik di komunitas tapi riwayat finansial belum terverifikasi penuh, tujuan pinjaman jelas namun kapasitas bayar perlu dikonfirmasi ulang lewat kunjungan survei langsung ke tempat usaha. Perlu satu kunjungan ekstra sebelum diproses.',
    tags: [
      { label: 'Survei langsung dulu', color: '#854F0B', bgColor: '#FAEEDA' },
      { label: 'Potensi bagus', color: '#185FA5', bgColor: '#E6F1FB' },
      { label: 'Layak diproses dengan catatan', color: '#3B6D11', bgColor: '#EAF3DE' },
    ],
  },
  {
    badge: 'C',
    badgeColor: '#A32D2D',
    badgeBgColor: '#FCEBEB',
    title: 'Tipe Berisiko — Tahan atau Tolak dengan Elegan',
    description: 'Tidak punya usaha yang jelas atau usaha sangat baru (<3 bulan), reputasi diragukan oleh ketua komunitas, tujuan pinjaman untuk konsumsi atau kebutuhan mendesak non-produktif, riwayat bermasalah secara keuangan, atau cicilan yang diminta akan melebihi 40% pendapatan estimasi.',
    tags: [
      { label: 'Jangan diproses', color: '#A32D2D', bgColor: '#FCEBEB' },
      { label: 'Sarankan perbaiki kondisi dulu', color: '#854F0B', bgColor: '#FAEEDA' },
      { label: 'Review ulang 3 bulan lagi', color: '#185FA5', bgColor: '#E6F1FB' },
    ],
  },
]

const mitraEducationSteps = [
  {
    number: 1,
    title: 'Berikan panduan kriteria yang simpel dan mudah diingat',
    description: 'Gunakan bahasa sehari-hari: "Yang bisa direkomendasikan itu: orangnya amanah, usahanya udah jalan, dan tujuan pinjamannya untuk usaha bukan untuk keperluan pribadi." Tiga kriteria ini mudah dipegang oleh ketua komunitas manapun.',
    color: '#FAEEDA',
    textColor: '#854F0B',
  },
  {
    number: 2,
    title: 'Berikan feedback rutin setelah setiap batch leads',
    description: 'Setelah memproses leads dari mitra, sampaikan: "Dari 10 yang kemarin dikirim, 7 lolos dan 3 belum bisa karena usahanya belum jelas." Feedback ini membantu mitra belajar dan secara bertahap meningkatkan kualitas rekomendasi mereka.',
    color: '#FAEEDA',
    textColor: '#854F0B',
  },
  {
    number: 3,
    title: 'Rayakan keberhasilan bersama mitra',
    description: 'Ketika nasabah yang direkomendasikan mitra berhasil cair, sampaikan kabar baiknya: "Alhamdulillah Pak, [Nama] yang Bapak rekomendasikan sudah cair. Terima kasih rekomendasinya, beliau sangat terbantu." Ini memotivasi mitra untuk terus terlibat aktif.',
    color: '#FAEEDA',
    textColor: '#854F0B',
  },
  {
    number: 4,
    title: 'Tunjukkan dampak negatif leads berkualitas rendah',
    description: 'Dengan cara yang santun, edukasi mitra bahwa leads yang tidak sesuai kriteria justru membebani calon nasabah itu sendiri: "Kalau kita proses orang yang belum siap, nanti malah dia yang susah bayar dan bisa mempengaruhi nama baiknya di komunitas."',
    color: '#FAEEDA',
    textColor: '#854F0B',
  },
]

const riskItems = [
  {
    label: 'R1 — Bulan Pertama',
    sublabel: 'Batas maksimum yang diizinkan',
    value: '5%',
    percentage: 5,
    color: '#BA7517',
    description: 'Dari 100 nasabah aktif, maksimal 5 boleh menunggak di bulan pertama. R1 tinggi = sinyal langsung ada kesalahan identifikasi karakter di awal. Ini sepenuhnya dalam kendali PAO sejak tahap screening.',
  },
  {
    label: 'R3M — Bulan Ketiga',
    sublabel: 'Batas maksimum kumulatif',
    value: '25%',
    percentage: 25,
    color: '#D4537E',
    description: 'Tunggak bulan ketiga bisa disebabkan masalah usaha, musibah, atau kondisi ekonomi. Lebih bisa ditoleransi tapi harus dimonitor aktif — mitra komunitas adalah instrumen monitoring terbaik yang dimiliki PAO.',
  },
]

const warningItems = [
  {
    title: 'Usaha mendadak sepi atau tutup sementara',
    description: 'Kabar dari mitra bahwa warung/lapak/bengkel nasabah jarang buka, omzet turun drastis, atau tutup lebih dari 3 hari tanpa pemberitahuan. Konfirmasi langsung ke nasabah dalam 24 jam.',
  },
  {
    title: 'Nasabah mulai menghindari komunikasi',
    description: 'Tidak membalas WA, nomor tidak diangkat, atau terus-terusan bilang "nanti ya" saat diingatkan jadwal cicilan. Ini sinyal ada masalah yang disembunyikan — segera cari tahu via mitra.',
  },
  {
    title: 'Musibah dalam keluarga',
    description: 'Sakit keras anggota keluarga, kecelakaan, kematian, atau bencana yang menguras simpanan. Mitra komunitas biasanya tahu lebih dahulu — jadikan mereka sebagai sensor lapangan.',
  },
  {
    title: 'Overload cicilan dari sumber lain',
    description: 'Nasabah mengambil pinjaman tambahan dari rentenir, pinjol lain, atau arisan bodong. Ini memperburuk cash flow dan meningkatkan risiko gagal bayar secara signifikan.',
  },
  {
    title: 'Perubahan gaya hidup yang tidak wajar',
    description: 'Tiba-tiba terlihat lebih boros atau sebaliknya sangat pelit (tanda tekanan keuangan berat). Mitra komunitas yang dekat dengan nasabah biasanya bisa mendeteksi ini lebih awal.',
  },
  {
    title: 'Konflik dalam usaha atau keluarga',
    description: 'Perselisihan dengan mitra usaha, perceraian, atau konflik keluarga yang berpotensi mempengaruhi stabilitas keuangan dan fokus dalam membayar cicilan.',
  },
]

const kpiLinkItems = [
  {
    title: 'AF Partnership Rp 300 Jt',
    description: 'Bukti bahwa sistem kemitraanmu berfungsi baik — komunitas aktif menghasilkan leads, leads menghasilkan pencairan.',
    value: '300 Jt',
    color: '#378ADD',
  },
  {
    title: 'Komunitas Aktif 35%',
    description: 'Bukti kualitas relationship managementmu — komunitas dirawat, bukan sekadar didaftar lalu ditinggalkan.',
    value: '35%',
    color: '#1D9E75',
  },
  {
    title: 'Leads to Order 50%',
    description: 'Bukti efektivitas proses screeningmu — kamu memilih dengan teliti, bukan asal menerima semua leads.',
    value: '50%',
    color: '#BA7517',
  },
  {
    title: 'R1 5% & R3M 25%',
    description: 'Bukti ketelitianmu dalam memilih nasabah dan kekuatan sistem monitoring berbasis komunitas yang kamu bangun.',
    value: '5% / 25%',
    color: '#D4537E',
  },
]

const digitalTools = [
  { icon: '📍', title: 'Community Mapping', description: 'Profil komunitas, status, histori kunjungan, dan rencana follow-up. Update setiap kunjungan.' },
  { icon: '👥', title: 'Leads Tracker', description: 'Nama, kontak, status screening, tahap proses, dan target tanggal cair untuk setiap leads aktif.' },
  { icon: '📊', title: 'KPI Dashboard', description: 'Progress harian vs target bulanan — AF, komunitas aktif, Leads to Order, dan angka risk secara real-time.' },
  { icon: '⚠️', title: 'Early Warning Log', description: 'Daftar nasabah yang perlu perhatian khusus, beserta tanggal deteksi dan tindakan yang sudah diambil.' },
  { icon: '📅', title: 'Visit Schedule', description: 'Jadwal kunjungan komunitas dan nasabah — pastikan tidak ada yang terlewat lebih dari 2 minggu.' },
  { icon: '📝', title: 'Activity Log', description: 'Rekap aktivitas harian sebagai basis evaluasi bulanan dan bahan diskusi dengan supervisor.' },
]

const paoComparisonRows = [
  { dimensi: 'Sumber leads', sales: 'bad Masih mencari sendiri mayoritas', pao: 'good Mitra yang aktif mengirim secara rutin' },
  { dimensi: 'Kualitas leads', sales: 'bad Rejection rate >40%', pao: 'good Rejection rate konsisten <25%' },
  { dimensi: 'R1', sales: 'bad Sering di atas 8–10%', pao: 'good Selalu di bawah 5%' },
  { dimensi: 'R3M', sales: 'bad Fluktuatif, susah diprediksi', pao: 'good Stabil di bawah 25%, termonitor' },
  { dimensi: 'Ketika nasabah macet', sales: 'bad Harus kejar sendiri satu per satu', pao: 'good Mitra komunitas membantu deteksi & ingatkan' },
  { dimensi: 'Digital form', sales: 'bad Diisi tidak teratur, sering kosong', pao: 'good Diisi real-time setiap aktivitas' },
  { dimensi: 'Hubungan komunitas', sales: 'bad Transaksional — datang saat butuh', pao: 'good Relasional jangka panjang, saling percaya' },
  { dimensi: 'Respons ketua mitra', sales: 'bad Kadang tidak membalas pesan', pao: 'good Proaktif menghubungi duluan' },
  { dimensi: 'Penggunaan waktu', sales: 'bad Mayoritas untuk prospecting baru', pao: 'good Mayoritas untuk mengelola relasi & kualitas' },
  { dimensi: 'Stabilitas target', sales: 'bad Fluktuasi besar bulan ke bulan', pao: 'good Konsisten mendekati atau melampaui target' },
]

export function LearningModule() {
  const [completedChapters, setCompletedChapters] = useState<number[]>([])

  const toggleChapter = (chapter: number) => {
    setCompletedChapters((prev) =>
      prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter]
    )
  }

  const completionCount = completedChapters.length

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">
                PAO E-Learning
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Strategic Partnership Account Officer
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm font-semibold text-blue-600">
                {completionCount} / 4
              </div>
              <p className="text-xs text-muted-foreground">Chapters Done</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="mb-6 sm:mb-8">
          <ModuleHeader
            title="Strategic Partnership Account Officer"
            subtitle="Panduan ultra-lengkap berbasis KPI — teori akademik, strategi lapangan, contoh nyata, skrip percakapan, framework operasional, dan indikator kematangan profesional PAO."
            tags={[
              '4 Bab Materi',
              'Teori Akademik',
              'Contoh Lapangan',
              'Skrip Percakapan',
              'Framework Praktis',
              'Checklist Operasional',
              'KPI Breakdown',
              'Maturity Level',
            ]}
          />
        </div>

        {/* KPI Section */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Key Performance Indicators
          </div>
          <KPICards items={kpiItems} />
        </div>

        {/* Progress Section */}
        <div className="mb-8 sm:mb-10">
          <ProgressTracker current={completionCount} total={4} />
        </div>

        {/* Chapters Section */}
        <div className="space-y-3 sm:space-y-4">
          {/* Chapter 1 */}
          <ChapterAccordion
            number="1"
            title="Positioning — Siapa Saya Sebenarnya?"
            subtitle="Role Identity · Mindset PAO · 3 Identitas Profesional · PAO vs Sales"
            completed={completedChapters.includes(1)}
            color="#378ADD"
          >
            <div className="space-y-6">
              <TheoryCard
                title="Landasan Teori — Role Identity Theory (Stryker & Burke)"
                content="Seseorang memiliki banyak identitas sosial yang berhierarkhi. Identitas dengan salience (kemenonjolan) tinggi akan memandu perilaku dalam situasi apapun. Ketika PAO memiliki identitas kuat sebagai 'manajer ekosistem komunitas', bukan 'sales harian', ia secara otomatis akan membuat keputusan yang lebih strategis, membangun relasi lebih dalam, dan menghasilkan portofolio lebih sehat — bahkan tanpa harus selalu diingatkan oleh atasan."
                color="#378ADD"
              />

              <div className="sub">
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Mengapa Positioning Adalah Fondasi Segalanya
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Sebelum berbicara tentang teknik, target, atau KPI — seorang PAO harus menjawab satu pertanyaan mendasar: <em>siapa saya dalam ekosistem ini?</em> Jawaban atas pertanyaan ini akan menentukan segalanya: cara kamu membuka percakapan, cara kamu menangani penolakan, cara kamu menjaga komunitas, dan cara kamu membaca angka KPI.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PAO yang memandang dirinya sebagai 'sales yang harus ngejar target' akan selalu stres, reactive, dan mudah menyerah ketika komunitas tidak langsung memberikan leads. PAO yang memandang dirinya sebagai 'manajer portofolio berbasis komunitas' akan sabar membangun fondasi, karena ia tahu hasilnya akan berlipat ganda dalam waktu yang tidak terlalu lama.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Tiga Pilar Identitas Profesional
                </h4>
                <IdentityCards items={identityItems} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Perbandingan Lengkap: Sales Tradisional vs PAO
                </h4>
                <ComparisonTable
                  headers={['Dimensi', 'Sales Tradisional', 'PAO Strategic']}
                  rows={comparisonRows}
                />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Studi Kasus Nyata di Lapangan
                </h4>
                <div className="space-y-3">
                  <ExampleCard
                    tag="Kasus A — PAO dengan mindset sales tradisional"
                    content={
                      <>
                        Dani bekerja keras setiap hari. Ia mengunjungi 15–20 rumah per hari, membagikan brosur, menawarkan pinjaman langsung. <span className="text-muted-foreground">Dalam sebulan, ia berhasil mengumpulkan 40 leads. Tapi dari 40 leads itu, hanya 12 yang lolos screening dan 7 yang akhirnya cair. R1-nya 15% karena ia tidak sempat memverifikasi karakter setiap calon. Di bulan berikutnya, ia harus memulai dari nol lagi.</span>
                      </>
                    }
                  />
                  <ExampleCard
                    tag="Kasus B — PAO dengan mindset strategic partner"
                    content={
                      <>
                        Sari memilih 5 RT/RW dengan UMKM aktif dan membangun hubungan dengan ketua masing-masing selama 3 minggu pertama. <span className="text-muted-foreground">Di bulan kedua, 4 dari 5 ketua mulai aktif mengirim referral. Total 38 leads masuk, 21 lolos screening, 17 cair. R1-nya 2%. Di bulan ketiga, tanpa tambahan komunitas baru, ia mendapat 45 leads karena ketua mulai merekomendasikan ke komunitas tetangga.</span> Sistem sudah berjalan sendiri.
                      </>
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Maturity Level PAO — Kamu Ada di Level Mana?
                </h4>
                <MaturityLevels levels={maturityLevels} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Value Creator — PAO sebagai Agen Pemberdayaan UMKM
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Positioning paling kuat yang bisa dimiliki PAO adalah sebagai <em>agen pemberdayaan ekonomi komunitas</em>. Ini bukan sekadar marketing — ini adalah realita. FINATRA hadir untuk membantu UMKM mendapatkan modal yang selama ini sulit diakses melalui perbankan formal.
                </p>
                <div className="space-y-3">
                  <PointCard
                    icon={<span className="text-green-600">1</span>}
                    title="Akses ke modal adalah masalah nyata UMKM Indonesia"
                    description="Lebih dari 64 juta UMKM di Indonesia masih kesulitan mengakses kredit formal. PAO adalah solusi nyata untuk gap ini — membawa akses pembiayaan langsung ke komunitas yang membutuhkan."
                  />
                  <PointCard
                    icon={<span className="text-blue-600">2</span>}
                    title="Setiap pencairan = peluang usaha yang terbuka"
                    description="Ketika kamu berhasil memproses seorang nasabah, kamu tidak hanya mencapai angka AF — kamu membantu seseorang mengembangkan usahanya, menjaga lapangan kerja, dan meningkatkan taraf hidup keluarganya."
                  />
                  <PointCard
                    icon={<span className="text-pink-600">3</span>}
                    title="Komunitas yang sehat = ekosistem yang berkelanjutan"
                    description="Nasabah yang usahanya berkembang akan kembali mengajukan pinjaman lebih besar, merekomendasikan kerabat, dan menjadi aset jangka panjang. Satu komunitas yang dirawat baik bisa menghasilkan value bertahun-tahun."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Skrip Pembuka — Cara Memperkenalkan Diri yang Tepat
                </h4>
                <div className="space-y-3">
                  <ScriptBox
                    label="Cara yang salah (mindset sales)"
                    script="Selamat pagi Pak/Bu, saya dari FINATRA. Kami punya produk pinjaman dengan bunga rendah. Apakah Bapak/Ibu atau anggota RT sini ada yang butuh pinjaman?"
                    explanation="Masalah: langsung menawarkan produk, terdengar seperti sales biasa. Resistensi tinggi, kemungkinan besar ditolak atau tidak ditanggapi serius."
                    variant="wrong"
                  />
                  <ScriptBox
                    label="Cara yang benar (mindset strategic partner)"
                    script="Selamat pagi Pak RT, saya [Nama] dari FINATRA. Kami sedang program kemitraan dengan komunitas UMKM di wilayah ini — tujuannya membantu warga yang punya usaha untuk lebih mudah akses modal. Boleh saya ceritakan sedikit dan minta masukan dari Bapak soal kondisi usaha warga di sini?"
                    explanation="Kenapa lebih baik: datang untuk mendengarkan dan berkolaborasi, bukan menawarkan. Menempatkan Ketua RT sebagai partner strategis, bukan target. Membuka ruang diskusi yang produktif."
                    variant="correct"
                  />
                </div>
              </div>

              <InsightBox color="#378ADD">
                Identitas profesional yang kuat adalah kompas yang mengarahkan setiap keputusan harian. Ketika kamu tahu kamu adalah seorang manajer ekosistem, bukan sekedar sales harian, kamu akan selalu memilih tindakan yang membangun sistem — bukan hanya mengejar angka jangka pendek.
              </InsightBox>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleChapter(1)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
                >
                  {completedChapters.includes(1) ? '✓ Mark as Done' : 'Mark as Done'}
                </button>
              </div>
            </div>
          </ChapterAccordion>

          {/* Chapter 2 */}
          <ChapterAccordion
            number="2"
            title="Hunting & Mapping Komunitas"
            subtitle="Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper · Kriteria Gold Community"
            completed={completedChapters.includes(2)}
            color="#1D9E75"
          >
            <div className="space-y-6">
              <TheoryCard
                title="Landasan Teori — Social Capital Theory (Robert Putnam, 1995)"
                content="Modal sosial adalah jaringan kepercayaan, norma, dan jaringan sosial yang memfasilitasi koordinasi dan kerjasama demi manfaat bersama. Putnam membedakan dua jenis: Bonding capital (kepercayaan dalam kelompok homogen yang solid) dan Bridging capital (kepercayaan lintas kelompok yang beragam). Bagi PAO: komunitas dengan bonding capital tinggi (RT/RW, koperasi) adalah target primer karena trust sudah ada — tinggal dimanfaatkan melalui figur Gatekeeper."
                color="#1D9E75"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Mengapa Komunitas — Bukan Individu — adalah Unit Kerja PAO
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Ketika PAO mendekati individu satu per satu, ia harus membangun kepercayaan dari nol setiap kali. Ini membutuhkan waktu, energi, dan tidak scalable. Ketika PAO mendekati komunitas melalui pemimpinnya, ia mendapatkan akses sekaligus ke seluruh jaringan kepercayaan yang sudah ada di dalam komunitas tersebut.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Satu Ketua RT yang percaya kepada kamu = puluhan anggota yang berpotensi mempercayai FINATRA berdasarkan kepercayaan mereka kepada ketuanya. Inilah yang disebut <em>Trust Transfer</em> — mekanisme paling efisien dalam akuisisi nasabah berbasis komunitas.
                </p>
              </div>

              <div className="space-y-3">
                <PointCard
                  icon={<span className="text-green-600 font-bold text-xs">Bn</span>}
                  title="Bonding Capital — Komunitas Solid (Prioritas Utama)"
                  description="RT/RW, Koperasi, Paguyuban Pedagang Pasar, Arisan PKK, Kelompok Tani. Anggota sudah saling kenal, saling percaya, dan ada norma sosial yang mengatur perilaku. Leads dari sini punya karakter yang lebih terverifikasi secara sosial."
                  tags={[
                    { label: 'Trust sudah ada', color: '#085041', bgColor: '#E1F5EE' },
                    { label: 'R1 rendah', color: '#3B6D11', bgColor: '#EAF3DE' },
                    { label: 'Konversi tinggi', color: '#185FA5', bgColor: '#E6F1FB' },
                    { label: 'Langsung eksekusi', color: '#854F0B', bgColor: '#FAEEDA' },
                  ]}
                />
                <PointCard
                  icon={<span className="text-amber-600 font-bold text-xs">Br</span>}
                  title="Bridging Capital — Komunitas Baru (Investasi Jangka Menengah)"
                  description="UMKM cluster baru, komunitas online yang belum kenal FINATRA, organisasi kemasyarakatan yang belum pernah disentuh kompetitor. Butuh 4–8 minggu edukasi sebelum menghasilkan leads, tapi potensi jangka panjangnya sangat besar dan bisa menjadi keunggulan eksklusif PAO."
                  tags={[
                    { label: 'Butuh edukasi dulu', color: '#854F0B', bgColor: '#FAEEDA' },
                    { label: 'Potensi besar', color: '#185FA5', bgColor: '#E6F1FB' },
                    { label: 'Sedikit kompetitor', color: '#3B6D11', bgColor: '#EAF3DE' },
                  ]}
                />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Kriteria Gold Community — 8 Poin Seleksi
                </h4>
                <Checklist items={goldCommunityCriteria} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Community Mapping Matrix — Prioritasi yang Tepat
                </h4>
                <MatrixGrid items={matrixItems} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  The Gatekeeper Effect — Teknik Lobbying 5 Langkah
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Ketua Komunitas adalah <em>Gatekeeper</em> — pemegang kunci akses ke seluruh jaringan kepercayaan komunitasnya. Satu Gatekeeper yang pro-FINATRA bisa membuka pintu untuk puluhan hingga ratusan nasabah berkualitas. Berikut teknik pendekatan yang terbukti efektif:
                </p>
                <StepList steps={lobbyingSteps} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Skrip Lobbying — Kata-Kata yang Terbukti Efektif
                </h4>
                <div className="space-y-3">
                  <ScriptBox
                    label="Membuka pertemuan pertama dengan Ketua RT"
                    script="Pak RT, terima kasih sudah mau meluangkan waktu. Saya [Nama] dari FINATRA — kami sedang ekspansi program kemitraan komunitas di wilayah ini. Sebelum saya ceritakan lebih lanjut, boleh saya dengar dulu kondisi warga di RT ini? Khususnya yang punya usaha kecil — apakah ada kendala yang sering mereka hadapi?"
                  />
                  <ScriptBox
                    label="Menjelaskan benefit ke ketua di pertemuan kedua"
                    script="Jadi begini Pak RT — kalau ada warga Bapak yang kita bantu dan mereka bayarnya lancar, komunitas RT ini akan masuk kategori mitra premium FINATRA. Artinya kuota dan kemudahan akses untuk warga RT ini akan meningkat. Dan sebagai bentuk apresiasi kerjasama, ada program khusus untuk Bapak sebagai mitra kami."
                  />
                  <ScriptBox
                    label="Meminta endorsement di pertemuan komunitas"
                    script="Pak RT, kalau boleh saya minta satu hal — saat Bapak memperkenalkan saya ke warga nanti, bisa disebutkan bahwa ini program yang Bapak sudah tinjau dan rekomendasikan? Kepercayaan warga kepada Bapak akan sangat membantu program ini berjalan baik untuk semua pihak."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Target 35% Komunitas Aktif — Cara Menghitung & Merawat
                </h4>
                <HighlightBox color="#639922" bgColor="#EAF3DE">
                  <strong>Formula:</strong> (Komunitas yang rutin kirim leads / Total komunitas terdaftar) × 100% ≥ 35%<br />
                  Contoh: PAO dengan 20 komunitas terdaftar → minimal 7 harus aktif setiap bulan.
                </HighlightBox>
              </div>

              <InsightBox color="#1D9E75">
                Satu komunitas aktif yang dirawat dengan baik bisa menghasilkan 8–15 leads per bulan secara konsisten. Dengan 7 komunitas aktif (target 35% dari 20 komunitas), PAO berpotensi mendapatkan 56–105 leads per bulan — lebih dari cukup untuk memenuhi target AF 300 Juta.
              </InsightBox>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleChapter(2)}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
                >
                  {completedChapters.includes(2) ? '✓ Mark as Done' : 'Mark as Done'}
                </button>
              </div>
            </div>
          </ChapterAccordion>

          {/* Chapter 3 */}
          <ChapterAccordion
            number="3"
            title="Lead Generation & Filtering"
            subtitle="AIDA Model · Funnel · Framework 2C · Customer Profiling · Edukasi Mitra · Kecepatan Follow-up"
            completed={completedChapters.includes(3)}
            color="#BA7517"
          >
            <div className="space-y-6">
              <TheoryCard
                title="Landasan Teori — Sales Funnel + Probability Theory + Quality over Quantity"
                content="Sales Funnel menggambarkan perjalanan prospek dari awareness hingga action. Probability Theory mengatakan: semakin besar probabilitas sukses di setiap tahap, semakin tinggi output akhirnya. Bagi PAO, ini berarti meningkatkan kualitas leads di tahap awal (Filtering at Source) secara dramatis meningkatkan jumlah pencairan aktual di akhir — dengan biaya operasional yang sama atau lebih rendah."
                color="#BA7517"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Visualisasi Funnel PAO — AIDA Model
                </h4>
                <FunnelChart stages={funnelStages} />
                <p className="text-xs text-muted-foreground mt-2">
                  *Tahap Decision (Leads to Order) adalah tahap yang paling bisa dikendalikan PAO. Target minimal 50% adalah standar efisiensi operasional FINATRA.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Framework 2C — First Screening yang Efektif
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {screeningFramework.map((item, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium"
                          style={{ backgroundColor: idx === 0 ? '#E6F1FB' : '#EAF3DE', color: idx === 0 ? '#185FA5' : '#3B6D11' }}
                        >
                          {item.icon}
                        </div>
                        <div className="font-medium text-sm">{item.title}</div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Customer Profiling — 3 Tipe Nasabah & Cara Penanganan
                </h4>
                <TierList tiers={customerTiers} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Skrip Screening — Percakapan dengan Calon Nasabah
                </h4>
                <div className="space-y-3">
                  <ScriptBox
                    label="Pertanyaan screening karakter (kepada mitra/ketua)"
                    script="Pak RT, dari nama-nama yang Bapak rekomendasikan tadi, ada yang Bapak paling yakin soal karakter dan kedisiplinannya? Yang Bapak tahu memang orangnya amanah dalam soal uang?"
                    explanation="Tips: Biarkan mitra menyebut nama sendiri — jangan tunjuk langsung. Nama yang disebut spontan biasanya adalah rekomendasi paling tulus dan berpeluang tinggi lolos screening."
                  />
                  <ScriptBox
                    label="Pertanyaan screening kapasitas (kepada calon nasabah)"
                    script="Bapak/Ibu usahanya sudah jalan berapa lama? Sehari kira-kira omzetnya berapa? Dana yang dibutuhkan untuk apa — untuk tambah stok atau beli peralatan? Kalau boleh, saya mau lihat tempatnya sebentar ya, biar prosesnya lebih mudah dan cepat."
                    explanation="Tips: Kunjungan ke tempat usaha adalah verifikasi terkuat. Usaha yang nyata akan mudah dikunjungi. Calon nasabah yang menolak atau menghindari kunjungan perlu diwaspadai."
                  />
                  <ScriptBox
                    label="Menolak leads dengan elegan tanpa merusak relasi"
                    script="Pak RT, untuk nama [X] ini, saya sudah cek dan untuk saat ini kondisinya belum memenuhi persyaratan kami. Mungkin 3 bulan lagi kalau usahanya sudah lebih berkembang, bisa kita coba lagi. Yang penting jangan sampai dia dipaksakan masuk sekarang karena nanti malah memberatkan dia sendiri."
                    explanation="Framing penolakan sebagai perlindungan terhadap calon nasabah, bukan penolakan sepihak. Ini menjaga hubungan dengan mitra tetap baik."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Edukasi Mitra — Sistem Dua Lapis yang Scalable
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  PAO yang mature tidak hanya memfilter leads sendiri — ia mendidik mitra sehingga pre-screening terjadi sebelum leads dikirim. Ini menciptakan sistem dua lapis: mitra menyaring dulu, PAO memverifikasi.
                </p>
                <StepList steps={mitraEducationSteps} />
              </div>

              <InsightBox color="#BA7517">
                Leads to Order 50% bukan hanya angka KPI — ini cerminan seberapa efektif sistem seleksimu. Setiap leads yang masuk dan kemudian di-reject adalah sumber daya (waktu, tenaga, biaya) yang terbuang. Investasi dalam kualitas leads adalah investasi dalam efisiensi keseluruhan operasional PAO.
              </InsightBox>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleChapter(3)}
                  className="flex-1 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-amber-700 active:scale-95"
                >
                  {completedChapters.includes(3) ? '✓ Mark as Done' : 'Mark as Done'}
                </button>
              </div>
            </div>
          </ChapterAccordion>

          {/* Chapter 4 */}
          <ChapterAccordion
            number="4"
            title="Menjaga Kualitas Portofolio"
            subtitle="Relationship Marketing · Goal Setting Theory · R1 & R3M · Early Warning · Community Control"
            completed={completedChapters.includes(4)}
            color="#D4537E"
          >
            <div className="space-y-6">
              <TheoryCard
                title="Landasan Teori — Relationship Marketing (Morgan & Hunt, 1994) + Goal Setting Theory (Locke & Latham)"
                content="Relationship Marketing menyatakan bahwa hubungan jangka panjang yang sukses dibangun di atas Trust dan Commitment — dan hubungan ini adalah aset bisnis paling berharga. Goal Setting Theory mengatakan bahwa target yang spesifik, terukur, dan terhubung dengan aktivitas harian akan menghasilkan performa jauh lebih tinggi. Kombinasi keduanya: PAO yang memahami angka KPI sebagai cermin dari kualitas hubungan dan aktivitas hariannya."
                color="#D4537E"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  KPI sebagai Cermin Kerja — Bukan Beban
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Angka target bukan diletakkan untuk menekan PAO — melainkan sebagai <em>indikator objektif</em> apakah PAO sudah menjalankan tugas dengan benar. Ketika angka tidak tercapai, pertanyaannya bukan "siapa yang salah?" tapi "proses mana yang perlu diperbaiki?"
                </p>
                <KPILink items={kpiLinkItems} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Memahami R1 dan R3M secara Mendalam
                </h4>
                <RiskCards items={riskItems} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Early Warning System — 6 Sinyal yang Harus Dideteksi
                </h4>
                <WarningList items={warningItems} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Community-Based Monitoring — 5 Strategi Kontrol Sosial
                </h4>
                <div className="space-y-3">
                  <PointCard
                    icon={<span className="text-green-600">1</span>}
                    title="Shared Values — Bangun Kepentingan Bersama yang Nyata"
                    description="Sampaikan secara eksplisit kepada Ketua Komunitas: 'RT kita yang angka bayar nasabahnya bagus akan mendapat peningkatan kuota pinjaman dan prioritas dalam program berikutnya.' Ini bukan sekadar motivasi abstrak — ini insentif konkret yang membuat mitra punya kepentingan langsung dalam menjaga kualitas pembayaran."
                  />
                  <PointCard
                    icon={<span className="text-blue-600">2</span>}
                    title="Social Pressure yang Konstruktif"
                    description="Dalam komunitas solid, reputasi adalah aset sosial yang dijaga. Nasabah yang menunggak tahu bahwa ketua dan tetangganya tahu kondisi tersebut. Kontrol sosial organik ini lebih efektif dari penagihan eksternal manapun — dan tidak merusak hubungan jangka panjang dengan komunitas."
                  />
                  <PointCard
                    icon={<span className="text-pink-600">3</span>}
                    title="Ketua sebagai Early Reminder, Bukan Penagih"
                    description="Edukasi ketua untuk mengingatkan nasabah secara informal sebelum jatuh tempo: 'Pak Budi, minggu depan cicilan FINATRA-nya ya.' Ini jauh lebih efektif dan menjaga hubungan sosial tetap baik. Bedakan dengan penagihan — mitra adalah teman yang mengingatkan, bukan collector."
                  />
                  <PointCard
                    icon={<span className="text-amber-600">4</span>}
                    title="Kunjungan Silaturahmi Berkala ke Nasabah Aktif"
                    description="Jangan hanya datang ketika ada masalah. Kunjungi nasabah yang pembayarannya lancar secara berkala untuk menunjukkan apresiasi. Ini membangun loyalitas yang kuat — nasabah yang merasa diperhatikan lebih cenderung membayar tepat waktu dan merekomendasikan kerabat mereka."
                  />
                  <PointCard
                    icon={<span className="text-green-600">5</span>}
                    title="Grup Informasi — Mitra sebagai Jaringan Intelijen"
                    description="Buat grup WA khusus dengan para ketua komunitas mitra. Gunakan untuk berbagi informasi penting (program baru, tips usaha), bukan untuk menagih. Mitra yang aktif di grup akan lebih terbuka berbagi informasi tentang kondisi nasabah secara organik."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Digitalisasi Operasional PAO — Tools Wajib
                </h4>
                <DataGrid items={digitalTools} />
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Perbandingan PAO Berkembang vs Mature — 10 Dimensi
                </h4>
                <ComparisonTable
                  headers={['Dimensi', 'PAO Berkembang', 'PAO Mature']}
                  rows={paoComparisonRows}
                />
              </div>

              <InsightBox color="#D4537E">
                PAO mature tidak lebih keras bekerja — ia bekerja lebih cerdas. Dengan sistem komunitas yang kuat, monitoring berbasis jaringan, dan data yang terkelola, ia memiliki lebih banyak waktu untuk hal-hal strategis yang terus meningkatkan performa jangka panjang.
              </InsightBox>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleChapter(4)}
                  className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-rose-700 active:scale-95"
                >
                  {completedChapters.includes(4) ? '✓ Mark as Done' : 'Mark as Done'}
                </button>
              </div>
            </div>
          </ChapterAccordion>
        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-12 rounded-lg border border-border bg-muted p-4 sm:p-6 text-center">
          <h3 className="mb-2 text-base sm:text-lg font-semibold text-foreground">
            🎓 Module Complete?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Selamat! Anda telah menyelesaikan pembelajaran fundamental PAO. Lanjutkan dengan latihan praktik dan menerapkan konsep-konsep ini di lapangan.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground transition-all hover:bg-muted">
              Review Module
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition-all hover:bg-blue-700">
              Download Certificate
            </button>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border bg-muted py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2025 FINATRA E-Learning Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
