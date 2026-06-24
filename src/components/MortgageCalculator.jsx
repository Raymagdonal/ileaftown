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

  // Pie chart proportions
  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <section className="py-16 bg-transparent border-t border-gray-200/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
            <Calculator size={14} />
            {lang === 'th' ? 'เครื่องมือการเงิน' : 'Financial Tools'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {lang === 'th' ? 'คำนวณสินเชื่อบ้าน' : 'Mortgage Calculator'}
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            {lang === 'th'
              ? 'วางแผนการเงินก่อนตัดสินใจซื้อ ลองปรับตัวเลขเพื่อดูยอดผ่อนต่อเดือนที่เหมาะกับคุณ'
              : 'Plan your finances before buying. Adjust the numbers to find a monthly payment that works for you.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: Sliders */}
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 md:p-8 space-y-7 shadow-md">

            {/* Home Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 size={14} className="text-blue-600" />
                  {lang === 'th' ? 'ราคาบ้าน' : 'Home Price'}
                </label>
                <span className="text-sm font-bold text-gray-800">฿{formatNumber(homePrice)}</span>
              </div>
              <input
                type="range" min="500000" max="20000000" step="100000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>฿500K</span><span>฿20M</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
                  <PiggyBank size={14} className="text-blue-600" />
                  {lang === 'th' ? 'เงินดาวน์' : 'Down Payment'}
                </label>
                <span className="text-sm font-bold text-gray-800">{downPaymentPercent}% (฿{formatNumber(downPayment)})</span>
              </div>
              <input
                type="range" min="0" max="50" step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0%</span><span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Percent size={14} className="text-blue-600" />
                  {lang === 'th' ? 'อัตราดอกเบี้ย (ต่อปี)' : 'Interest Rate (per year)'}
                </label>
                <span className="text-sm font-bold text-gray-800">{interestRate}%</span>
              </div>
              <input
                type="range" min="0" max="10" step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>0%</span><span>10%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-blue-600" />
                  {lang === 'th' ? 'ระยะเวลาผ่อน' : 'Loan Term'}
                </label>
                <span className="text-sm font-bold text-gray-800">{loanTerm} {lang === 'th' ? 'ปี' : 'years'}</span>
              </div>
              <input
                type="range" min="5" max="35" step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>5 {lang === 'th' ? 'ปี' : 'yrs'}</span><span>35 {lang === 'th' ? 'ปี' : 'yrs'}</span>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="w-full lg:w-1/2 space-y-6">

            {/* Monthly Payment Hero Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-500/30 rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <p className="text-blue-200 text-xs uppercase tracking-widest mb-2 font-semibold">
                {lang === 'th' ? 'ยอดผ่อนชำระต่อเดือน' : 'Monthly Payment'}
              </p>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                ฿{formatNumber(monthlyPayment)}
              </p>
              <p className="text-blue-200 text-xs mt-2">
                {lang === 'th' ? 'บาท / เดือน' : 'THB / month'}
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote size={16} className="text-blue-600" />
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wide">
                    {lang === 'th' ? 'ยอดกู้' : 'Loan Amount'}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">฿{formatNumber(loanAmount)}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank size={16} className="text-blue-600" />
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wide">
                    {lang === 'th' ? 'เงินดาวน์' : 'Down Payment'}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">฿{formatNumber(downPayment)}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={16} className="text-red-400" />
                  <span className="text-[10px] uppercase font-bold text-red-500 tracking-wide">
                    {lang === 'th' ? 'ดอกเบี้ยรวม' : 'Total Interest'}
                  </span>
                </div>
                <p className="text-lg font-bold text-red-500">฿{formatNumber(totalInterest)}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays size={16} className="text-blue-600" />
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wide">
                    {lang === 'th' ? 'ยอดรวมทั้งหมด' : 'Total Payment'}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">฿{formatNumber(totalPayment)}</p>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl p-5">
              <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wide mb-3">
                {lang === 'th' ? 'สัดส่วนเงินต้น vs ดอกเบี้ย' : 'Principal vs Interest Ratio'}
              </p>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-blue-500 rounded-l-full transition-all duration-500"
                  style={{ width: `${principalPercent}%` }}
                ></div>
                <div
                  className="h-full bg-red-400 rounded-r-full transition-all duration-500"
                  style={{ width: `${interestPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                  <span className="text-gray-500">{lang === 'th' ? 'เงินต้น' : 'Principal'} {principalPercent.toFixed(1)}%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                  <span className="text-gray-500">{lang === 'th' ? 'ดอกเบี้ย' : 'Interest'} {interestPercent.toFixed(1)}%</span>
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
