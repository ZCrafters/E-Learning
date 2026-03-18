'use client'

import { useState } from 'react'
import { ModuleHeader } from './module-header'
import { KPICards } from './kpi-cards'
import { ProgressTracker } from './progress-tracker'
import { ChapterAccordion } from './chapter-accordion'
import { TheoryCard } from './theory-card'
import { IdentityCards } from './identity-cards'
import { InsightBox } from './insight-box'

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
            <div className="space-y-4">
              <TheoryCard
                title="Landasan Teori — Role Identity Theory"
                content="Seseorang memiliki banyak identitas sosial yang berhierarkhi. Identitas dengan salience (kemenonjolan) tinggi akan memandu perilaku dalam situasi apapun. Ketika PAO memiliki identitas kuat sebagai 'manajer ekosistem komunitas', bukan 'sales harian', ia secara otomatis akan membuat keputusan yang lebih strategis."
                color="#378ADD"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Mengapa Positioning Adalah Fondasi Segalanya
                </h4>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Sebelum berbicara tentang teknik, target, atau KPI — seorang PAO harus menjawab satu pertanyaan mendasar: <em>siapa saya dalam ekosistem ini?</em>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PAO yang memandang dirinya sebagai "sales yang harus ngejar target" akan selalu stres. PAO yang memandang dirinya sebagai "manajer portofolio berbasis komunitas" akan sabar membangun fondasi.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Tiga Pilar Identitas Profesional
                </h4>
                <IdentityCards items={identityItems} />
              </div>

              <InsightBox color="#378ADD">
                Identitas yang kuat sebagai "manajer ekosistem" akan membimbing setiap keputusan Anda, bahkan dalam situasi yang tidak terduga. Ini lebih kuat daripada motivasi eksternal atau target yang berubah-ubah.
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
            title="Strategi Membangun Komunitas"
            subtitle="Engagement · Relationship Building · Community Management · Trust Factors"
            completed={completedChapters.includes(2)}
            color="#1D9E75"
          >
            <div className="space-y-4">
              <TheoryCard
                title="Community-First Approach"
                content="Komunitas bukan hanya kumpulan orang. Komunitas adalah ekosistem yang hidup dengan dinamika, nilai bersama, dan tujuan kolektif. Sebagai PAO, tugas Anda bukan hanya mencari leads, tetapi memelihara ekosistem yang sehat."
                color="#1D9E75"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Lima Tahap Membangun Kepercayaan
                </h4>
                <div className="space-y-2">
                  {['Awareness', 'Trust', 'Engagement', 'Advocacy', 'Leadership'].map((stage, idx) => (
                    <div key={idx} className="flex gap-3 rounded-lg border border-border bg-muted p-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                        {idx + 1}
                      </div>
                      <div className="text-sm font-medium text-foreground">{stage}</div>
                    </div>
                  ))}
                </div>
              </div>

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
            title="Konversi Lead ke Transaksi"
            subtitle="Sales Process · Objection Handling · Closing Techniques · Follow-up Strategy"
            completed={completedChapters.includes(3)}
            color="#BA7517"
          >
            <div className="space-y-4">
              <TheoryCard
                title="Lead Quality vs Lead Quantity"
                content="Tidak semua lead adalah sama. Lead berkualitas dari komunitas terpercaya memiliki conversion rate lebih tinggi dan lifetime value lebih besar. Fokus pada kualitas daripada mengejar jumlah."
                color="#BA7517"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Proses Konversi yang Efektif
                </h4>
                <div className="space-y-2">
                  {[
                    { stage: 'Qualification', desc: 'Pastikan lead cocok dengan produk' },
                    { stage: 'Engagement', desc: 'Bangun rapport dan pemahaman kebutuhan' },
                    { stage: 'Presentation', desc: 'Tunjukkan value proposition yang relevan' },
                    { stage: 'Closure', desc: 'Tawarkan solusi terbaik dan closing' },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-border bg-muted p-3">
                      <div className="font-medium text-sm text-foreground mb-1">
                        {idx + 1}. {item.stage}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

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
            title="Maturity Level & Self-Development"
            subtitle="PAO Proficiency · KPI Management · Continuous Improvement · Career Path"
            completed={completedChapters.includes(4)}
            color="#D4537E"
          >
            <div className="space-y-4">
              <TheoryCard
                title="Menjadi PAO Level Expert"
                content="Perjalanan dari Junior ke Expert PAO adalah perjalanan berkelanjutan. Setiap transaksi, setiap interaksi komunitas, dan setiap feedback adalah pembelajaran yang berharga untuk meningkatkan profesionalisme Anda."
                color="#D4537E"
              />

              <div>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Empat Level Maturity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { level: 'Beginner', emoji: '🌱', desc: 'Dasar PAO, sedang belajar proses' },
                    { level: 'Intermediate', emoji: '📈', desc: 'Konsisten mencapai KPI' },
                    { level: 'Advanced', emoji: '⭐', desc: 'Melebihi target, mentor junior' },
                    { level: 'Expert', emoji: '🏆', desc: 'Strategic player, model excellence' },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-border bg-muted p-3">
                      <div className="text-2xl mb-2">{item.emoji}</div>
                      <div className="font-semibold text-sm text-foreground mb-1">
                        {item.level}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

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
