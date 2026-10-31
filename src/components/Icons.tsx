import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
}

/**
 * Modern Briefcase Icon for Workplace / Overview
 */
export function BriefcaseIcon({ size = 20, color = '#2563EB' }: IconProps) {
  const width = size;
  const height = Math.round(size * 0.85);
  const handleWidth = Math.round(size * 0.42);
  const handleHeight = Math.round(size * 0.22);
  const stroke = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View style={[styles.center, { width, height }]}>
      {/* Handle */}
      <View
        style={{
          width: handleWidth,
          height: handleHeight,
          borderTopWidth: stroke,
          borderLeftWidth: stroke,
          borderRightWidth: stroke,
          borderColor: color,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          marginBottom: -1,
        }}
      />
      {/* Body */}
      <View
        style={{
          width,
          height: height - handleHeight + 1,
          borderWidth: stroke,
          borderColor: color,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Horizontal strap */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: stroke,
            backgroundColor: color,
            top: '40%',
            opacity: 0.4,
          }}
        />
        {/* Center lock */}
        <View
          style={{
            width: Math.max(3, Math.round(size * 0.16)),
            height: Math.max(3, Math.round(size * 0.16)),
            backgroundColor: color,
            borderRadius: 1,
            top: 1,
          }}
        />
      </View>
    </View>
  );
}

/**
 * Analytics Bar Chart Icon
 */
export function ChartIcon({ size = 20, color = '#2563EB' }: IconProps) {
  const width = size;
  const height = size;
  const stroke = Math.max(1.5, Math.round(size * 0.08));
  const barWidth = Math.max(2.5, Math.round(size * 0.18));

  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingHorizontal: 1,
          marginBottom: stroke,
        }}
      >
        {/* Bar 1 */}
        <View
          style={{
            width: barWidth,
            height: Math.round(height * 0.45),
            backgroundColor: color,
            borderRadius: 1.5,
          }}
        />
        {/* Bar 2 */}
        <View
          style={{
            width: barWidth,
            height: Math.round(height * 0.85),
            backgroundColor: color,
            borderRadius: 1.5,
          }}
        />
        {/* Bar 3 */}
        <View
          style={{
            width: barWidth,
            height: Math.round(height * 0.65),
            backgroundColor: color,
            borderRadius: 1.5,
          }}
        />
      </View>
      {/* Baseline */}
      <View
        style={{
          width: '100%',
          height: stroke,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

/**
 * Employee / User Profile Icon
 */
export function UserIcon({ size = 20, color = '#2563EB' }: IconProps) {
  const width = size;
  const height = size;
  const stroke = Math.max(1.5, Math.round(size * 0.08));
  const headSize = Math.round(size * 0.42);

  return (
    <View style={[styles.center, { width, height }]}>
      {/* Head */}
      <View
        style={{
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          borderWidth: stroke,
          borderColor: color,
          marginBottom: 2,
        }}
      />
      {/* Torso / Shoulders */}
      <View
        style={{
          width: Math.round(size * 0.84),
          height: Math.round(size * 0.38),
          borderTopLeftRadius: Math.round(size * 0.4),
          borderTopRightRadius: Math.round(size * 0.4),
          borderWidth: stroke,
          borderColor: color,
          borderBottomWidth: 0,
        }}
      />
    </View>
  );
}

/**
 * Sliders / Settings Icon
 */
export function SettingsIcon({ size = 20, color = '#2563EB' }: IconProps) {
  const width = size;
  const height = size;
  const stroke = Math.max(1.5, Math.round(size * 0.08));
  const knobSize = Math.max(4, Math.round(size * 0.24));

  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'space-around',
        paddingVertical: 1,
      }}
    >
      {/* Track 1 */}
      <View style={{ justifyContent: 'center', height: knobSize }}>
        <View style={{ height: stroke, backgroundColor: color, borderRadius: 1 }} />
        <View
          style={{
            position: 'absolute',
            left: '25%',
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: '#FFFFFF',
            borderWidth: stroke,
            borderColor: color,
          }}
        />
      </View>

      {/* Track 2 */}
      <View style={{ justifyContent: 'center', height: knobSize }}>
        <View style={{ height: stroke, backgroundColor: color, borderRadius: 1 }} />
        <View
          style={{
            position: 'absolute',
            left: '65%',
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: '#FFFFFF',
            borderWidth: stroke,
            borderColor: color,
          }}
        />
      </View>

      {/* Track 3 */}
      <View style={{ justifyContent: 'center', height: knobSize }}>
        <View style={{ height: stroke, backgroundColor: color, borderRadius: 1 }} />
        <View
          style={{
            position: 'absolute',
            left: '40%',
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            backgroundColor: '#FFFFFF',
            borderWidth: stroke,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
}

/**
 * Checkmark Icon
 */
export function CheckIcon({ size = 12, color = '#FFFFFF' }: IconProps) {
  const stroke = Math.max(1.5, Math.round(size * 0.16));

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: Math.round(size * 0.7),
          height: Math.round(size * 0.42),
          borderBottomWidth: stroke,
          borderLeftWidth: stroke,
          borderColor: color,
          transform: [{ rotate: '-45deg' }, { translateY: -1 }],
        }}
      />
    </View>
  );
}

/**
 * Plus Icon (+ Create Task)
 */
export function PlusIcon({ size = 14, color = '#FFFFFF' }: IconProps) {
  const stroke = Math.max(1.5, Math.round(size * 0.14));

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Horizontal Bar */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: stroke,
          backgroundColor: color,
          borderRadius: stroke / 2,
        }}
      />
      {/* Vertical Bar */}
      <View
        style={{
          position: 'absolute',
          height: size,
          width: stroke,
          backgroundColor: color,
          borderRadius: stroke / 2,
        }}
      />
    </View>
  );
}

/**
 * Clock / Time Icon
 */
export function ClockIcon({ size = 12, color = '#858585' }: IconProps) {
  const stroke = Math.max(1.2, Math.round(size * 0.09));

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: stroke,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Minute Hand */}
      <View
        style={{
          position: 'absolute',
          width: stroke,
          height: Math.round(size * 0.32),
          backgroundColor: color,
          top: Math.round(size * 0.16),
          borderRadius: 1,
        }}
      />
      {/* Hour Hand */}
      <View
        style={{
          position: 'absolute',
          height: stroke,
          width: Math.round(size * 0.26),
          backgroundColor: color,
          left: '50%',
          top: '50%',
          marginTop: -stroke / 2,
          borderRadius: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

