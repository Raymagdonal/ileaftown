import React, { useState } from 'react';
import { Calculator, TrendingDown, Banknote, CalendarDays, Percent, PiggyBank, Building2 } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const MortgageCalculator = () => {
  const { lang } = useLang();

  const [homePrice, setHomePrice] = useState(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const downPayment = Math.round(homePrice * (downPaymentPercent / 100));
  const loanAmount = homePrice - downPayment;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (loanAmount > 0) {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    if (monthlyRate === 0) {
      monthlyPayment = Math.round(loanAmount / numberOfPayments);
    } else {
      monthlyPayment = Math.round(
        loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      );
    }
    totalPayment = monthlyPayment * numberOfPayments;
    totalInterest = totalPayment - loanAmount;
  }

  const formatNumber = (n) => n.toLocaleString('th-TH');

  // Ratio proportions
  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <section className="py-20 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Calculator size={13} className="text-[#C5A880]" />
            {lang === 'th' ? 'เครื่องมือการเงิน' : 'Financial Tools'}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide text-glow">
            {lang === 'th' ? 'คำนวณสินเชื่อบ้าน' : 'Mortgage Calculator'}
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto leading-relaxed">
            {lang === 'th'
              ? 'วางแผนการเงินก่อนตัดสินใจซื้อ ลองปรับตัวเลขเพื่อดูยอดผ่อนต่อเดือนที่เหมาะกับคุณ'
              : 'Plan your finances before buying. Adjust the numbers to find a monthly payment that works for you.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* Left: Premium Sliders Panel */}
          <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            
            {/* Home Price */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <Building2 size={15} className="text-[#C5A880]" />
                  {lang === 'th' ? 'ราคาบ้าน' : 'Home Price'}
                </label>
                <span className="text-lg font-bold text-[#C5A880] font-display">฿{formatNumber(homePrice)}</span>
              </div>
              <input
                type="range" min="500000" max="20000000" step="100000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A880] focus:outline-none transition-all duration-300"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                <span>฿500K</span><span>฿20M</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <PiggyBank size={15} className="text-[#C5A880]" />
                  {lang === 'th' ? 'เงินดาวน์' : 'Down Payment'}
                </label>
                <span className="text-lg font-bold text-[#C5A880] font-display">{downPaymentPercent}% <span className="text-sm font-sans text-white/60">(฿{formatNumber(downPayment)})</span></span>
              </div>
              <input
                type="range" min="0" max="50" step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A880] focus:outline-none transition-all duration-300"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                <span>0%</span><span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <Percent size={15} className="text-[#C5A880]" />
                  {lang === 'th' ? 'อัตราดอกเบี้ย (ต่อปี)' : 'Interest Rate (per year)'}
                </label>
                <span className="text-lg font-bold text-[#C5A880] font-display">{interestRate}%</span>
              </div>
              <input
                type="range" min="0" max="10" step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A880] focus:outline-none transition-all duration-300"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                <span>0%</span><span>10%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-2">
                  <CalendarDays size={15} className="text-[#C5A880]" />
                  {lang === 'th' ? 'ระยะเวลาผ่อน' : 'Loan Term'}
                </label>
                <span className="text-lg font-bold text-[#C5A880] font-display">{loanTerm} {lang === 'th' ? 'ปี' : 'years'}</span>
              </div>
              <input
                type="range" min="5" max="35" step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C5A880] focus:outline-none transition-all duration-300"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                <span>5 {lang === 'th' ? 'ปี' : 'yrs'}</span><span>35 {lang === 'th' ? 'ปี' : 'yrs'}</span>
              </div>
            </div>
          </div>

          {/* Right: Premium Results Panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">

            {/* Monthly Payment Hero Card (Dark Glass / Gold Glow) */}
            <div className="bg-black/35 backdrop-blur-lg border border-[#C5A880]/30 rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-2xl shadow-black/20 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2 font-semibold">
                {lang === 'th' ? 'ยอดผ่อนชำระต่อเดือน' : 'Monthly Payment'}
              </p>
              <p className="text-4xl sm:text-5xl font-bold tracking-wide text-[#C5A880] font-display text-glow">
                ฿{formatNumber(monthlyPayment)}
              </p>
              <p className="text-white/40 text-xs mt-2 font-sans">
                {lang === 'th' ? 'บาท / เดือน' : 'THB / month'}
              </p>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Loan Amount */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote size={15} className="text-[#C5A880]" />
                  <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                    {lang === 'th' ? 'ยอดกู้' : 'Loan Amount'}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white font-mono">฿{formatNumber(loanAmount)}</p>
              </div>

              {/* Down Payment */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank size={15} className="text-[#C5A880]" />
                  <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                    {lang === 'th' ? 'เงินดาวน์' : 'Down Payment'}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white font-mono">฿{formatNumber(downPayment)}</p>
              </div>

              {/* Total Interest (Red warning highlight styled beautifully) */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-red-400/25 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={15} className="text-red-400" />
                  <span className="text-[10px] uppercase font-bold text-red-300/80 tracking-wider">
                    {lang === 'th' ? 'ดอกเบี้ยรวม' : 'Total Interest'}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-red-400 font-mono">฿{formatNumber(totalInterest)}</p>
              </div>

              {/* Total Payment */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays size={15} className="text-[#C5A880]" />
                  <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                    {lang === 'th' ? 'ยอดรวมทั้งหมด' : 'Total Payment'}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white font-mono">฿{formatNumber(totalPayment)}</p>
              </div>
            </div>

            {/* Premium Ratio Bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
              <p className="text-[10px] uppercase font-bold text-white/70 tracking-wider mb-3">
                {lang === 'th' ? 'สัดส่วนเงินต้น vs ดอกเบี้ย' : 'Principal vs Interest Ratio'}
              </p>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden flex border border-white/5">
                <div
                  className="h-full bg-[#C5A880] rounded-l-full transition-all duration-500"
                  style={{ width: `${principalPercent}%` }}
                ></div>
                <div
                  className="h-full bg-red-400 rounded-r-full transition-all duration-500"
                  style={{ width: `${interestPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2.5 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880] inline-block"></span>
                  <span className="text-white/60">{lang === 'th' ? 'เงินต้น' : 'Principal'} {principalPercent.toFixed(1)}%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                  <span className="text-white/60">{lang === 'th' ? 'ดอกเบี้ย' : 'Interest'} {interestPercent.toFixed(1)}%</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
