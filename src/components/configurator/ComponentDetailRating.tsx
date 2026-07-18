'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ComponentDetailRatingProps {
  rating: number;
}

function ComponentDetailRatingBase({ rating }: ComponentDetailRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.05 }}
        >
          <Star
            className={`w-5 h-5 ${
              i < Math.floor(rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-border'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export const ComponentDetailRating = React.memo(ComponentDetailRatingBase);
