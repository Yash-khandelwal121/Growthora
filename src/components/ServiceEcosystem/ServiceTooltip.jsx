import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ServiceTooltip renders the connected status panel below the semicircular graph.
 * Displays the current active stage details and consultation navigation.
 */
export const ServiceTooltip = ({
  activeSegment,
  activeStageIndex,
}) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    if (!activeSegment) return;
    navigate(`/book-consultation?service=${encodeURIComponent(activeSegment.name)}`, {
      state: { service: activeSegment.name, category: activeSegment.name },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isComplete = activeStageIndex >= 6;
  const stageColor = activeSegment?.color || '#FF5A00';

  return (
    <div className="w-full max-w-[520px] mx-auto mt-2.5 sm:mt-3 px-1 select-none">
      <div
        className="relative bg-white/95 backdrop-blur-md border border-[#F2DCC8] rounded-2xl p-3.5 sm:p-4 shadow-md shadow-navy-950/5 transition-all duration-300"
        style={{
          boxShadow: `0 8px 24px ${stageColor}12, 0 2px 8px rgba(16, 26, 55, 0.04)`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left info area */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Stage Number Badge */}
            <div
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white font-extrabold text-xs sm:text-sm shrink-0 shadow-md transition-all duration-300"
              style={{
                backgroundColor: stageColor,
                boxShadow: `0 4px 12px ${stageColor}35`,
              }}
            >
              {activeSegment ? activeSegment.code : '00'}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                <span
                  className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border transition-colors"
                  style={{
                    color: stageColor,
                    borderColor: `${stageColor}35`,
                    backgroundColor: `${stageColor}10`,
                  }}
                >
                  Stage {activeSegment ? activeSegment.code : '00'} / 06
                </span>

                {isComplete && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Sparkles size={11} />
                    Complete Ecosystem
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-[#101A37] leading-tight mb-0.5 truncate">
                {activeSegment ? activeSegment.name : 'Complete Business Advisory Ecosystem'}
              </h4>

              <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed">
                {activeSegment
                  ? activeSegment.description
                  : 'A sequential advisory journey guiding your business from setup to scaling.'}
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-2 sm:self-center shrink-0">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: stageColor,
                boxShadow: `0 4px 14px ${stageColor}30`,
              }}
            >
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

