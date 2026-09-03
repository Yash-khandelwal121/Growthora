import React, { useState } from 'react';
import { BLUEPRINT_DATA } from '../../data/blueprintData';
import { Blueprint3DModel } from './Category3DModels/Blueprint3DModel';
import { BlueprintExecutionPath } from './BlueprintExecutionPath';
import { Sparkles, Info } from 'lucide-react';

export const BlueprintCanvas = ({ categoryId }) => {
  const [activeNode, setActiveNode] = useState(null);

  const blueprint = BLUEPRINT_DATA[categoryId] || BLUEPRINT_DATA['01'];
  const activeNodeInfo = activeNode 
    ? blueprint.interactiveNodes.find((n) => n.id === activeNode) 
    : null;

  return (
    <div className="blueprint-table-container">
      {/* Architectural Measurement Ticks & Border Header */}
      <div className="blueprint-table-header">
        <div className="blueprint-plaque-primary">
          <Sparkles size={14} className="plaque-sparkle" />
          <span>GROWTHORA BUSINESS BLUEPRINT</span>
        </div>

        <div className="blueprint-plaque-tagline">
          <span>{blueprint.tagline}</span>
        </div>
      </div>

      {/* Architectural Blueprint Table Canvas */}
      <div className="blueprint-canvas-body">
        {/* Interactive Tooltip Banner when hovering 3D elements */}
        {activeNodeInfo ? (
          <div className="blueprint-tooltip-banner animate-fade-in">
            <Info size={14} className="tooltip-icon" />
            <div className="tooltip-text">
              <strong>{activeNodeInfo.title}:</strong> {activeNodeInfo.desc}
            </div>
          </div>
        ) : (
          <div className="blueprint-tooltip-banner hint">
            <span className="hint-dot" />
            <span>Hover over 3D model elements to examine practice details</span>
          </div>
        )}

        {/* 3D Isometric Visual Model */}
        <div className="blueprint-model-wrapper">
          <Blueprint3DModel 
            categoryId={categoryId}
            activeNode={activeNode}
            setActiveNode={setActiveNode}
          />
        </div>

        {/* Illuminated Execution Path */}
        <BlueprintExecutionPath executionPath={blueprint.executionPath} />
      </div>

      {/* Blueprint Footer Measurement Ticks */}
      <div className="blueprint-table-footer">
        <span className="tick-mark">001</span>
        <span className="tick-mark">///</span>
        <span className="tick-mark">SCALE: 1:1 ADVISORY EXECUTION</span>
        <span className="tick-mark">///</span>
        <span className="tick-mark">GROWTHORA PRACTICE 0{categoryId}</span>
      </div>
    </div>
  );
};
