// This file contains the main plugin logic

// This shows the HTML page in "ui.html"
figma.showUI(__html__, { width: 320, height: 480 });

// When a message is received from the UI
figma.ui.onmessage = async (msg) => {
  // Handle live preview requests
  if (msg.type === 'preview-pattern') {
    try {
      console.log('Preview request received for:', msg.patternType);
      const { patternType, width, height, options = {} } = msg;
      
      // Get color from options
      const color = options.color || '#E0E0E0';
      const opacity = options.opacity || 0.8;
      
      // For previews, use simplified SVGs that are guaranteed to work
      let svgContent;
      
      // Generate simple SVG based on pattern type
      switch (patternType) {
        case 'Grid':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="${color}" stroke-width="0.5" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>`;
          break;
          
        case 'Dots':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.5" fill="${color}" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>`;
          break;
          
        case 'Circles':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circles" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="5" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circles)"/>
          </svg>`;
          break;
          
        case 'Lines':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="lines" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="5" x2="10" y2="5" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#lines)"/>
          </svg>`;
          break;
          
        case 'Waves':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="waves" width="20" height="10" patternUnits="userSpaceOnUse">
              <path d="M 0 5 Q 5 0, 10 5 T 20 5" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#waves)"/>
          </svg>`;
          break;
          
        case 'Stars':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="stars" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,2 L12,8 L18,8 L13,12 L15,18 L10,14 L5,18 L7,12 L2,8 L8,8 Z" fill="${color}" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#stars)"/>
          </svg>`;
          break;
          
        case 'Crosses':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="crosses" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M5,2 L10,2 L10,5 L13,5 L13,10 L10,10 L10,13 L5,13 L5,10 L2,10 L2,5 L5,5 Z" fill="${color}" opacity="${opacity}" transform="translate(-1.5,-1.5)"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#crosses)"/>
          </svg>`;
          break;
          
        case 'TinyTriangles':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="triangles" width="15" height="15" patternUnits="userSpaceOnUse">
              <polygon points="7.5,3 12,12 3,12" fill="${color}" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#triangles)"/>
          </svg>`;
          break;
          
        case 'HexagonGrid':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="hexagons" width="30" height="30" patternUnits="userSpaceOnUse">
              <polygon points="15,5 25,12.5 21,25 9,25 5,12.5" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)"/>
          </svg>`;
          break;
          
        case 'AbstractWaves':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="abstractWaves" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q10,5 20,15 T40,10" fill="none" stroke="${color}" stroke-width="1.5" opacity="${opacity}"/>
              <path d="M0,15 Q10,20 20,5 T40,15" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity*0.8}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#abstractWaves)"/>
          </svg>`;
          break;

        case 'Snow':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="snow" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,5 V15 M5,10 H15 M7,7 L13,13 M13,7 L7,13" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#snow)"/>
          </svg>`;
          break;
          
        case 'CircleScatter':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="${width*0.2}" cy="${height*0.3}" r="3" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.5}" cy="${height*0.2}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.8}" cy="${height*0.4}" r="4" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.3}" cy="${height*0.7}" r="3.5" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.6}" cy="${height*0.6}" r="2.5" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.9}" cy="${height*0.8}" r="3" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.1}" cy="${height*0.5}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.7}" cy="${height*0.9}" r="4" fill="${color}" opacity="${opacity}"/>
            </g>
          </svg>`;
          break;

        case 'SquareTiles':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="squares" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="18" height="18" stroke="${color}" fill="none" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#squares)"/>
          </svg>`;
          break;

        case 'WaveDots':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="${width*0.1}" cy="${height*0.3}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.2}" cy="${height*0.5}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.3}" cy="${height*0.7}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.4}" cy="${height*0.6}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.5}" cy="${height*0.4}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.6}" cy="${height*0.2}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.7}" cy="${height*0.3}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.8}" cy="${height*0.5}" r="2" fill="${color}" opacity="${opacity}"/>
              <circle cx="${width*0.9}" cy="${height*0.7}" r="2" fill="${color}" opacity="${opacity}"/>
            </g>
          </svg>`;
          break;

        case 'ConcentricCircles':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="concentric" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="15" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
              <circle cx="20" cy="20" r="10" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
              <circle cx="20" cy="20" r="5" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#concentric)"/>
          </svg>`;
          break;

        case 'ThinXMarks':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="xmarks" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M3,3 L12,12 M12,3 L3,12" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#xmarks)"/>
          </svg>`;
          break;

        case 'Chevrons':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="chevrons" width="20" height="10" patternUnits="userSpaceOnUse">
              <path d="M0,10 L10,0 L20,10" stroke="${color}" fill="none" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#chevrons)"/>
          </svg>`;
          break;
          
        case 'TinyMoons':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="moons" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,5 a5,5 0 1,0 0,10 a3,5 0 1,1 0,-10" fill="${color}" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#moons)"/>
          </svg>`;
          break;

        case 'Arrowheads':
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <pattern id="arrows" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M5,10 L15,10 M10,5 L15,10 L10,15" stroke="${color}" fill="none" stroke-width="1" opacity="${opacity}"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#arrows)"/>
          </svg>`;
          break;
          
        default:
          // For all other patterns, create a simplified representation
          svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f8f8f8"/>
            <text x="${width/2}" y="${height/2}" text-anchor="middle" font-size="10" fill="${color}">${patternType}</text>
          </svg>`;
      }
      
      // Create data URL with the SVG content
      const dataUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgContent);
      
      // Post back to UI
      console.log('Sending preview for:', patternType);
      figma.ui.postMessage({ type: 'pattern-preview', patternType, dataUrl });
    } catch (err) {
      console.error('Error generating SVG preview for', msg.patternType, err);
      // Send error message to UI so it knows something failed
      figma.ui.postMessage({ 
        type: 'pattern-preview-error', 
        patternType: msg.patternType, 
        error: err.message 
      });
    }
    return;
  }
  if (msg.type === 'apply-pattern') {
    const { 
      patternType,
      density = 50, // Default density if not provided
      size = 50,    // Default size
      opacity = 0.8,  // Default opacity
      color = '#E0E0E0' // Default color
    } = msg;
    
    // Get current selection
    const selection = figma.currentPage.selection;
    
    // Check if exactly one frame is selected
    if (selection.length !== 1 || selection[0].type !== 'FRAME') {
      figma.notify('Please select exactly one frame');
      return;
    }
    
    const selectedFrame = selection[0];
    
    // Notify user that we're applying the pattern
    figma.notify(`Applying ${patternType} pattern...`);
    
    try {
      // Generate SVG pattern with options
      const svgString = generateSVG(patternType, selectedFrame.width, selectedFrame.height, { density, size, color, opacity });
      console.log(`Generated ${patternType} SVG with size ${selectedFrame.width}x${selectedFrame.height}`);
      
      try {
        // Create a node from SVG
        const patternNode = figma.createNodeFromSvg(svgString);
        
        if (!patternNode) {
          throw new Error('Failed to create pattern from SVG');
        }
        
        console.log('Pattern created successfully:', patternNode.type);
        
        // Add the pattern to the frame
        selectedFrame.appendChild(patternNode);
        
        // Position the pattern at the top-left corner of the frame
        patternNode.x = 0;
        patternNode.y = 0;
        
        // Name the pattern
        patternNode.name = `${patternType} Pattern`;
        
        // If the pattern is a group, we need to handle each child
        if (patternNode.type === 'GROUP') {
          console.log(`Pattern is a group with ${patternNode.children.length} children`);
          
          // Get all children except the white background (if present)
          for (const child of patternNode.children) {
            // Skip white rectangles that might be the background
            if (child.type === 'RECTANGLE' && 
                child.fills && 
                child.fills.length > 0 && 
                child.fills[0].type === 'SOLID' && 
                child.fills[0].color.r === 1 && 
                child.fills[0].color.g === 1 && 
                child.fills[0].color.b === 1) {
              child.remove();
              continue;
            }
            
            // Keep all other elements
            child.name = `${patternType} Element`;
          }
        }
        
        figma.notify(`Applied ${patternType} pattern successfully!`);
      } catch (error) {
        console.error('Error creating pattern:', error);
        figma.notify(`Error creating pattern: ${error.message}`);
        
        // Fallback to simple pattern with options
        createFallbackPattern(patternType, selectedFrame, { density, size, color, opacity });
      }
    } catch (error) {
      console.error('Error applying pattern:', error);
      figma.notify(`Error applying pattern: ${error.message}`);
    }
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

// Helper function to map a value from one range to another
function mapRange(value, inMin, inMax, outMin, outMax) {
  // Ensure value is within input range
  const clampedValue = Math.max(inMin, Math.min(value, inMax));
  // Perform linear mapping
  return ((clampedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Function to create a simple fallback pattern if SVG fails
function createFallbackPattern(patternType, frame, options = {}) {
  // Define default options (merge with provided options)
  const defaultOptions = { density: 50, size: 50, color: '#E0E0E0', opacity: 0.8 };
  // Use Object.assign for broader compatibility
  const mergedOptions = Object.assign({}, defaultOptions, options);
  
  // Helper function to convert hex to Figma RGB
  function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0.8, g: 0.8, b: 0.8 }; // Default to gray if hex is invalid
  }

  const patternColor = hexToRgb(mergedOptions.color);
  const patternOpacity = mergedOptions.opacity;

  try {
    console.log('Creating fallback pattern for', patternType);
    let elements = [];
    
    switch (patternType) {
      case 'Grid': {
        // --- Grid Fallback with Options ---
        // Map density (1-100) to spacing (e.g., 100 down to 5)
        const minSpacing = 5;
        const maxSpacing = 100;
        // Ensure gridSize is at least 1
        const gridSize = Math.max(1, mapRange(mergedOptions.density, 1, 100, maxSpacing, minSpacing));

        const minStroke = 0.1; // Ensure stroke is non-zero
        const maxStroke = 5; // Slightly reduced max
        // Ensure stroke is at least minStroke
        const gridStrokeWeight = Math.max(minStroke, mapRange(mergedOptions.size, 1, 100, minStroke, maxStroke));

        const gridStroke = [{ type: 'SOLID', color: patternColor, opacity: patternOpacity }];
        
        // Create horizontal lines
        for (let y = gridSize; y < frame.height; y += gridSize) {
          const line = figma.createLine();
          line.resize(frame.width, 0);
          line.x = 0;
          line.y = y;
          line.strokes = gridStroke;
          line.strokeWeight = gridStrokeWeight;
          frame.appendChild(line);
          line.name = 'Grid Line Horizontal';
          elements.push(line);
        }
        
        // Create vertical lines
        for (let x = gridSize; x < frame.width; x += gridSize) {
          const line = figma.createLine();
          line.resize(0, frame.height);
          line.x = x;
          line.y = 0;
          line.strokes = gridStroke;
          line.strokeWeight = gridStrokeWeight;
          frame.appendChild(line);
          line.name = 'Grid Line Vertical';
          elements.push(line);
        }
        break;
      }
      
      case 'Dots': {
        // --- Dots Fallback with Options ---
        // Map density (1-100) to spacing (e.g., 80 down to 5)
        const minSpacing = 5;
        const maxSpacing = 80;
        // Ensure spacing is at least 1
        const dotSpacing = Math.max(1, mapRange(mergedOptions.density, 1, 100, maxSpacing, minSpacing));

        // Map size (1-100) to radius (e.g., 0.5 up to 20)
        const minRadius = 0.2; // Ensure radius is non-zero
        const maxRadius = 15; // Reduced max radius
        // Ensure radius is at least minRadius
        const dotRadius = Math.max(minRadius, mapRange(mergedOptions.size, 1, 100, minRadius, maxRadius));
        
        const dotFill = [{ type: 'SOLID', color: patternColor, opacity: patternOpacity }];
        
        // Create a dot component to reuse
        for (let x = dotSpacing; x < frame.width; x += dotSpacing) {
          for (let y = dotSpacing; y < frame.height; y += dotSpacing) {
            const dot = figma.createEllipse();
            dot.resize(dotRadius * 2, dotRadius * 2); // Use diameter
            dot.x = x - dotRadius;
            dot.y = y - dotRadius;
            dot.fills = dotFill;
            frame.appendChild(dot);
            dot.name = 'Dot';
            elements.push(dot);
          }
        }
        break;
      }
      
      case 'Circles': {
        // Create concentric circles in a grid
        const spacing = 80;
        const outerColor = { r: 0.94, g: 0.94, b: 0.94 }; // #F0F0F0
        const innerColor = { r: 0.91, g: 0.91, b: 0.91 }; // #E8E8E8
        
        for (let x = spacing/2; x < frame.width; x += spacing) {
          for (let y = spacing/2; y < frame.height; y += spacing) {
            // Outer circle
            const outerCircle = figma.createEllipse();
            outerCircle.resize(60, 60);
            outerCircle.x = x - 30;
            outerCircle.y = y - 30;
            outerCircle.fills = [{ type: 'SOLID', color: outerColor }];
            frame.appendChild(outerCircle);
            outerCircle.name = 'Circle Outer';
            elements.push(outerCircle);
            
            // Inner circle
            const innerCircle = figma.createEllipse();
            innerCircle.resize(30, 30);
            innerCircle.x = x - 15;
            innerCircle.y = y - 15;
            innerCircle.fills = [{ type: 'SOLID', color: innerColor }];
            frame.appendChild(innerCircle);
            innerCircle.name = 'Circle Inner';
            elements.push(innerCircle);
          }
        }
        break;
      }
      
      case 'Waves':
        // Direct wave lines
        pattern = `
          <g>
            ${Array.from(
              { length: Math.ceil(frame.height/20) }, 
              (_, i) => {
                const y = i * 20 + 10;
                return `
                  <path d="M0 ${y} C ${frame.width*0.2} ${y-10}, ${frame.width*0.3} ${y+10}, ${frame.width*0.5} ${y} C ${frame.width*0.7} ${y-10}, ${frame.width*0.8} ${y+10}, ${frame.width} ${y}" 
                        stroke="#D8D8D8" stroke-width="2" fill="none"/>
                  <path d="M0 ${y+5} C ${frame.width*0.2} ${y-5}, ${frame.width*0.3} ${y+15}, ${frame.width*0.5} ${y+5} C ${frame.width*0.7} ${y-5}, ${frame.width*0.8} ${y+15}, ${frame.width} ${y+5}" 
                        stroke="#E8E8E8" stroke-width="1.5" fill="none"/>
                `;
              }
            ).join('')}
          </g>
        `;
        break;
      
      case 'Lines': {
        // --- Lines Fallback with Options (Simplified Diagonal) ---
        // Note: Fallback uses rectangles for diagonal lines, harder to control density precisely.
        // We'll adjust stroke weight based on size and use a fixed number of lines.

        // Map size (1-100) to stroke weight (e.g., 0.5 up to 8)
        const minStroke = 0.1; // Ensure stroke is non-zero
        const maxStroke = 10; // Increased max slightly
        // Ensure stroke is at least minStroke
        const lineStrokeWeight = Math.max(minStroke, mapRange(mergedOptions.size, 1, 100, minStroke, maxStroke));

        const lineFill = [{ type: 'SOLID', color: patternColor, opacity: patternOpacity }];
        // Density affects the *number* of lines in fallback (more direct control)
        const minLines = 2;
        const maxLines = 20;
        const numLines = Math.round(mapRange(mergedOptions.density, 1, 100, minLines, maxLines)); 
        const angle = 45;

        for(let i = 0; i < numLines; i++) {
          const line = figma.createRectangle();
          const length = Math.sqrt(frame.width**2 + frame.height**2) * 1.5; // Cover corners better
          line.resize(length, lineStrokeWeight); 
          // Distribute lines across the diagonal more evenly
          const offsetDist = (Math.max(frame.width, frame.height) / 2) * 1.4; // Approx diagonal half-length
          const offset = mapRange(i, 0, numLines - 1, -offsetDist, offsetDist);
          
          // Position center based on offset perpendicular to angle
          line.x = frame.width / 2 + offset * Math.cos(angle * Math.PI / 180 + Math.PI/2) - length / 2;
          line.y = frame.height / 2 + offset * Math.sin(angle * Math.PI / 180 + Math.PI/2) - lineStrokeWeight / 2;

          line.rotation = angle;
          line.fills = lineFill;
          frame.appendChild(line);
          line.name = `Diagonal Line ${i+1}`;
          elements.push(line);
        }
        break;
      }
      
      case 'AbstractWaves': {
        // Create abstract wave patterns
        const waveColor1 = { r: 0.85, g: 0.85, b: 0.85 }; // #D8D8D8
        const waveColor2 = { r: 0.91, g: 0.91, b: 0.91 }; // #E8E8E8
        
        for (let i = 0; i < 6; i++) {
          const wave = figma.createRectangle();
          wave.resize(frame.width * 1.5, 2);
          wave.x = -frame.width / 4;
          wave.y = frame.height * (i * 0.2 + 0.1);
          wave.fills = [{ type: 'SOLID', color: i % 2 === 0 ? waveColor1 : waveColor2 }];
          
          // Create a wavy path by applying varying rotation
          wave.rotation = Math.sin(i * 1.5) * 10;
          
          frame.appendChild(wave);
          wave.name = `Abstract Wave ${i+1}`;
          elements.push(wave);
        }
        break;
      }
      
      case 'Snow': {
        // Create snowflake pattern with simple crosses and dots
        const snowColor = { r: 0.9, g: 0.9, b: 0.9 }; // #E5E5E5
        const snowSpacing = 40; // Renamed from dotSpacing for clarity
        
        for (let x = snowSpacing; x < frame.width; x += snowSpacing) {
          for (let y = snowSpacing; y < frame.height; y += snowSpacing) {
            if (Math.round(x / snowSpacing + y / snowSpacing) % 2 === 0) { // Use Math.round for robustness
              // Create a snowflake (simple cross)
              const vertLine = figma.createRectangle();
              vertLine.resize(1.5, 8); // Slightly thicker lines
              vertLine.x = x - 0.75;
              vertLine.y = y - 4;
              vertLine.fills = [{ type: 'SOLID', color: snowColor }];
              
              const horizLine = figma.createRectangle();
              horizLine.resize(8, 1.5); // Slightly thicker lines
              horizLine.x = x - 4;
              horizLine.y = y - 0.75;
              horizLine.fills = [{ type: 'SOLID', color: snowColor }];
              
              frame.appendChild(vertLine);
              frame.appendChild(horizLine);
              vertLine.name = 'Snow Cross Vertical'; // More specific name
              horizLine.name = 'Snow Cross Horizontal'; // More specific name
              elements.push(vertLine, horizLine);
            } else {
              // Create a dot for variety
              const dot = figma.createEllipse();
              dot.resize(3, 3);
              dot.x = x - 1.5;
              dot.y = y - 1.5;
              dot.fills = [{ type: 'SOLID', color: snowColor }];
              frame.appendChild(dot);
              dot.name = 'Snow Dot';
              elements.push(dot);
            }
          }
        }
        break;
      }
      
      case 'Stars': {
        // SVG: Create simple star pattern with asterisk-like shapes
        const starsSVG = [];
        const starSpacingSVG = 50;
        const lineLength = 10;
        const strokeWidth = 1.5;
    
        for (let x = starSpacingSVG; x < frame.width; x += starSpacingSVG) {
          for (let y = starSpacingSVG; y < frame.height; y += starSpacingSVG) {
            // Create 4 lines radiating from the center
            for (let i = 0; i < 4; i++) {
              const angle = i * 45 * (Math.PI / 180); // 0, 45, 90, 135 degrees
              const x1 = x - (lineLength / 2) * Math.cos(angle);
              const y1 = y - (lineLength / 2) * Math.sin(angle);
              const x2 = x + (lineLength / 2) * Math.cos(angle);
              const y2 = y + (lineLength / 2) * Math.sin(angle);
              starsSVG.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E0E0E0" stroke-width="${strokeWidth}"/>`);
            }
          }
        }
        pattern = `<g>${starsSVG.join('')}</g>`;
        break;
      }
      
      case 'Crosses': {
        // SVG: Create cross pattern with plus signs
        const crossesSVG = [];
        const crossSpacingSVG = 45;
        const crossSize = 12;
        const crossThickness = 2;
    
        for (let x = crossSpacingSVG; x < frame.width; x += crossSpacingSVG) {
          for (let y = crossSpacingSVG; y < frame.height; y += crossSpacingSVG) {
            // Vertical line
            crossesSVG.push(`<rect x="${x - crossThickness / 2}" y="${y - crossSize / 2}" width="${crossThickness}" height="${crossSize}" fill="#D8D8D8"/>`);
            // Horizontal line
            crossesSVG.push(`<rect x="${x - crossSize / 2}" y="${y - crossThickness / 2}" width="${crossSize}" height="${crossThickness}" fill="#D8D8D8"/>`);
          }
        }
        pattern = `<g>${crossesSVG.join('')}</g>`;
        break;
      }
      
      case 'TinyTriangles': {
        // SVG: Create tiny triangles pattern pointing in different directions
        const trianglesSVG = [];
        const triangleSpacingSVG = 30;
        const triSize = 6; // Size of the triangle base/height
    
        for (let x = triangleSpacingSVG; x < frame.width; x += triangleSpacingSVG) {
          for (let y = triangleSpacingSVG; y < frame.height; y += triangleSpacingSVG) {
            const direction = (Math.floor(x / triangleSpacingSVG) + Math.floor(y / triangleSpacingSVG)) % 4;
            let points = "";
            // Define points based on direction (0: up, 1: right, 2: down, 3: left)
            const halfSize = triSize / 2;
            if (direction === 0) points = `${x},${y-halfSize} ${x-halfSize},${y+halfSize} ${x+halfSize},${y+halfSize}`;
            else if (direction === 1) points = `${x-halfSize},${y-halfSize} ${x+halfSize},${y} ${x-halfSize},${y+halfSize}`;
            else if (direction === 2) points = `${x-halfSize},${y-halfSize} ${x+halfSize},${y-halfSize} ${x},${y+halfSize}`;
            else points = `${x+halfSize},${y-halfSize} ${x+halfSize},${y+halfSize} ${x-halfSize},${y}`;
    
            trianglesSVG.push(`<polygon points="${points}" fill="#E0E0E0"/>`);
          }
        }
        pattern = `<g>${trianglesSVG.join('')}</g>`;
        break;
      }
      
      case 'CircleScatter': {
        // SVG: Create scattered circles of different sizes
        const circlesSVG = [];
        const colorsSVG = ["#E5E5E5", "#F0F0F0", "#E0E0E0"];
    
        for (let i = 0; i < 50; i++) {
          const x = (((i * 13) % 17) / 17) * frame.width;
          const y = (((i * 19) % 23) / 23) * frame.height;
          const radius = (3 + ((i % 5) * 2)) / 2;
          const color = colorsSVG[i % 3];
          circlesSVG.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}"/>`);
        }
        pattern = `<g>${circlesSVG.join('')}</g>`;
        break;
      }
      
      case 'HexagonGrid': {
        // SVG: Create honeycomb hex grid pattern
        const hexagonsSVG = [];
        const hexSizeSVG = 20;
        const hexWidth = Math.sqrt(3) * hexSizeSVG;
        const hexHeight = 2 * hexSizeSVG;
        const vertSpacing = hexHeight * 3/4;
    
        for (let row = 0; row * vertSpacing < frame.height + hexHeight; row++) {
          for (let col = 0; col * hexWidth < frame.width + hexWidth; col++) {
            const xOffset = (row % 2) * (hexWidth / 2);
            const cx = col * hexWidth + xOffset;
            const cy = row * vertSpacing;
    
            const points = [];
            for (let i = 0; i < 6; i++) {
              const angle_deg = 60 * i - 30;
              const angle_rad = Math.PI / 180 * angle_deg;
              const px = cx + hexSizeSVG * Math.cos(angle_rad);
              const py = cy + hexSizeSVG * Math.sin(angle_rad);
              points.push(`${px},${py}`);
            }
            hexagonsSVG.push(`<polygon points="${points.join(' ')}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
          }
        }
        pattern = `<g>${hexagonsSVG.join('')}</g>`;
        break;
      }
      
      case 'Chevrons': {
        // SVG: Create chevron pattern (V shapes)
        const chevronsSVG = [];
        const chevronRowSpacing = 30;
        const chevronWidth = 14; // Width of the V
        const chevronHeight = 10; // Height of the V
        const chevronSpacingX = 20;
    
        for (let y = chevronRowSpacing; y < frame.height; y += chevronRowSpacing) {
          for (let x = chevronSpacingX / 2; x < frame.width; x += chevronSpacingX) {
            const points = `${x - chevronWidth / 2},${y + chevronHeight / 2} ${x},${y - chevronHeight / 2} ${x + chevronWidth / 2},${y + chevronHeight / 2}`;
            chevronsSVG.push(`<polyline points="${points}" stroke="#D8D8D8" stroke-width="1.5" fill="none"/>`);
          }
        }
        pattern = `<g>${chevronsSVG.join('')}</g>`;
        break;
      }
      
      case 'SquareTiles': {
        // SVG: Create square tile pattern
        const squaresSVG = [];
        const tileSizeSVG = 30;
        const tileSpacingSVG = 40;
    
        for (let x = tileSpacingSVG / 2; x < frame.width; x += tileSpacingSVG) {
          for (let y = tileSpacingSVG / 2; y < frame.height; y += tileSpacingSVG) {
            squaresSVG.push(`<rect x="${x - tileSizeSVG / 2}" y="${y - tileSizeSVG / 2}" width="${tileSizeSVG}" height="${tileSizeSVG}" stroke="#E5E5E5" stroke-width="1" fill="none"/>`);
          }
        }
        pattern = `<g>${squaresSVG.join('')}</g>`;
        break;
      }
      
      case 'WaveDots': {
        // SVG: Create wave dots pattern
        const waveDotsSVG = [];
        const waveHSpacing = 20;
        const waveAmp = 10;
        const waveVSpacing = 30;
        const dotRadius = 2;
    
        for (let row = 0; row * waveVSpacing < frame.height + waveAmp; row++) {
          for (let col = 0; col * waveHSpacing < frame.width; col++) {
            const x = col * waveHSpacing;
            const y = row * waveVSpacing + Math.sin(col * 0.5) * waveAmp;
            if (y > -dotRadius && y < frame.height + dotRadius) { // Only draw if potentially visible
                waveDotsSVG.push(`<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="#E0E0E0"/>`);
            }
          }
        }
        pattern = `<g>${waveDotsSVG.join('')}</g>`;
        break;
      }
      
      case 'ConcentricCircles': {
        // Concentric circles pattern
        const concentricCircles = [];
        const ccSpacing = 70;
        
        for (let row = 0; row < Math.ceil(frame.height / ccSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / ccSpacing); col++) {
            const x = col * ccSpacing + ccSpacing/2;
            const y = row * ccSpacing + ccSpacing/2;
            
            // Create 3 concentric circles
            concentricCircles.push(`
              <circle cx="${x}" cy="${y}" r="25" stroke="#E0E0E0" stroke-width="1" fill="none"/>
              <circle cx="${x}" cy="${y}" r="17" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
              <circle cx="${x}" cy="${y}" r="9" stroke="#E0E0E0" stroke-width="0.6" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${concentricCircles.join('')}
          </g>
        `;
        break;
      }
        
      case 'ThinXMarks':
        // Thin X marks pattern
        const xMarks = [];
        const xmSpacing = 40;
        
        for (let row = 0; row < Math.ceil(frame.height / xmSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / xmSpacing); col++) {
            const x = col * xmSpacing + xmSpacing/2;
            const y = row * xmSpacing + xmSpacing/2;
            const size = 6;
            
            xMarks.push(`
              <line x1="${x-size}" y1="${y-size}" x2="${x+size}" y2="${y+size}" stroke="#E0E0E0" stroke-width="1"/>
              <line x1="${x-size}" y1="${y+size}" x2="${x+size}" y2="${y-size}" stroke="#E0E0E0" stroke-width="1"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${xMarks.join('')}
          </g>
        `;
        break;
        
      case 'OvalGrid':
        // Oval grid pattern
        const ovals = [];
        const ovalSpacing = 50;
        
        for (let row = 0; row < Math.ceil(frame.height / ovalSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / ovalSpacing); col++) {
            const x = col * ovalSpacing + ovalSpacing/2;
            const y = row * ovalSpacing + ovalSpacing/2;
            
            // Alternate horizontal and vertical ovals
            if ((row + col) % 2 === 0) {
              // Horizontal oval
              ovals.push(`
                <ellipse cx="${x}" cy="${y}" rx="15" ry="10" fill="none" stroke="#E0E0E0" stroke-width="1"/>
              `);
            } else {
              // Vertical oval
              ovals.push(`
                <ellipse cx="${x}" cy="${y}" rx="10" ry="15" fill="none" stroke="#E0E0E0" stroke-width="1"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${ovals.join('')}
          </g>
        `;
        break;
        
      case 'AngledLines':
        // Angled lines pattern
        const angledLines = [];
        const alSpacing = 30;
        const lineLength = 20;
        
        for (let row = 0; row < Math.ceil(frame.height / alSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / alSpacing); col++) {
            const x = col * alSpacing + alSpacing/2;
            const y = row * alSpacing + alSpacing/2;
            const variant = (row + col) % 4;
            
            // Create angled lines in 4 different directions
            if (variant === 0) {
              // 45 degrees
              angledLines.push(`
                <line x1="${x-lineLength/2}" y1="${y-lineLength/2}" x2="${x+lineLength/2}" y2="${y+lineLength/2}" 
                      stroke="#E0E0E0" stroke-width="1.2"/>
              `);
            } else if (variant === 1) {
              // 135 degrees
              angledLines.push(`
                <line x1="${x-lineLength/2}" y1="${y+lineLength/2}" x2="${x+lineLength/2}" y2="${y-lineLength/2}" 
                      stroke="#E0E0E0" stroke-width="1.2"/>
              `);
            } else if (variant === 2) {
              // Horizontal
              angledLines.push(`
                <line x1="${x-lineLength/2}" y1="${y}" x2="${x+lineLength/2}" y2="${y}" 
                      stroke="#E0E0E0" stroke-width="1.2"/>
              `);
            } else {
              // Vertical
              angledLines.push(`
                <line x1="${x}" y1="${y-lineLength/2}" x2="${x}" y2="${y+lineLength/2}" 
                      stroke="#E0E0E0" stroke-width="1.2"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${angledLines.join('')}
          </g>
        `;
        break;
        
      case 'SpiralDots':
        // Spiral dots pattern
        const spiralDots = [];
        const spiralSets = Math.ceil((frame.width * frame.height) / (200 * 200));
        
        for (let i = 0; i < spiralSets; i++) {
          // Create center points for each spiral set
          const centerX = (i % Math.ceil(Math.sqrt(spiralSets))) * (frame.width / Math.ceil(Math.sqrt(spiralSets))) + frame.width / (Math.ceil(Math.sqrt(spiralSets)) * 2);
          const centerY = Math.floor(i / Math.ceil(Math.sqrt(spiralSets))) * (frame.height / Math.ceil(Math.sqrt(spiralSets))) + frame.height / (Math.ceil(Math.sqrt(spiralSets)) * 2);
          
          // Create spiral of dots
          for (let j = 0; j < 30; j++) {
            const angle = j * 0.5;
            const radius = j * 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            spiralDots.push(`<circle cx="${x}" cy="${y}" r="${1 + j/20}" fill="#E0E0E0"/>`);
          }
        }
        
        pattern = `
          <g>
            ${spiralDots.join('')}
          </g>
        `;
        break;
        
      case 'DashedLines':
        // Dashed lines pattern
        const dashedLines = [];
        const dlSpacing = 25;
        
        for (let y = dlSpacing/2; y < frame.height; y += dlSpacing) {
          dashedLines.push(`
            <line x1="0" y1="${y}" x2="${frame.width}" y2="${y}" 
                  stroke="#E0E0E0" stroke-width="1.2" stroke-dasharray="8 8"/>
          `);
        }
        
        pattern = `
          <g>
            ${dashedLines.join('')}
          </g>
        `;
        break;
        
      case 'ScatteredSquares':
        // Scattered squares pattern
        const scatteredSquares = [];
        
        // Generate 50 squares with deterministic pseudo-random positions and sizes
        for (let i = 0; i < 50; i++) {
          const x = Math.round((((i * 17) % 23) / 23) * frame.width);
          const y = Math.round((((i * 19) % 29) / 29) * frame.height);
          const size = 4 + ((i % 4) * 2);
          
          scatteredSquares.push(`
            <rect x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}" 
                  fill="none" stroke="#E0E0E0" stroke-width="1"/>
          `);
        }
        
        pattern = `
          <g>
            ${scatteredSquares.join('')}
          </g>
        `;
        break;
        
      case 'TinyMoons':
        // Tiny moons (crescents) pattern
        const moons = [];
        const moonSpacing = 40;
        
        for (let row = 0; row < Math.ceil(frame.height / moonSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / moonSpacing); col++) {
            const x = col * moonSpacing + moonSpacing/2;
            const y = row * moonSpacing + moonSpacing/2;
            
            // Rotate the moon based on position
            const rotation = ((row + col) % 4) * 90;
            
            moons.push(`
              <g transform="translate(${x}, ${y}) rotate(${rotation})">
                <circle cx="0" cy="0" r="9" fill="#E8E8E8"/>
                <circle cx="4" cy="0" r="8" fill="white"/>
              </g>
            `);
          }
        }
        
        pattern = `
          <g>
            ${moons.join('')}
          </g>
        `;
        break;
        
      case 'Arrowheads':
        // Arrowheads pattern
        const arrowheads = [];
        const arrowSpacing = 35;
        
        for (let row = 0; row < Math.ceil(frame.height / arrowSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / arrowSpacing); col++) {
            const x = col * arrowSpacing + arrowSpacing/2;
            const y = row * arrowSpacing + arrowSpacing/2;
            
            // Rotate arrow based on position
            const variant = (row + col) % 4;
            let transform = '';
            
            if (variant === 0) {
              // Point right
              transform = '';
            } else if (variant === 1) {
              // Point down
              transform = 'rotate(90)';
            } else if (variant === 2) {
              // Point left
              transform = 'rotate(180)';
            } else {
              // Point up
              transform = 'rotate(270)';
            }
            
            arrowheads.push(`
              <g transform="translate(${x}, ${y}) ${transform}">
                <polygon points="0,0 8,4 0,8" fill="#E0E0E0"/>
              </g>
            `);
          }
        }
        
        pattern = `
          <g>
            ${arrowheads.join('')}
          </g>
        `;
        break;
        
      case 'BlockDots':
        // Block dots (square dots) pattern
        const blockDots = [];
        const bdSpacing = 30;
        
        for (let row = 0; row < Math.ceil(frame.height / bdSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / bdSpacing); col++) {
            const x = col * bdSpacing + bdSpacing/2;
            const y = row * bdSpacing + bdSpacing/2;
            
            blockDots.push(`
              <rect x="${x-3}" y="${y-3}" width="6" height="6" fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${blockDots.join('')}
          </g>
        `;
        break;
      
      case 'ThinBars':
        // Thin bars pattern (like morse code)
        const thinBars = [];
        const barSpacing = 30;
        const barWidth = 12;
        const barHeight = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / barSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / barSpacing); col++) {
            const x = col * barSpacing + barSpacing/2;
            const y = row * barSpacing + barSpacing/2;
            
            // Alternate horizontal and vertical bars
            const variant = (row + col) % 2;
            
            if (variant === 0) {
              // Horizontal bar
              thinBars.push(`
                <rect x="${x-barWidth/2}" y="${y-barHeight/2}" width="${barWidth}" height="${barHeight}" fill="#E0E0E0"/>
              `);
            } else {
              // Vertical bar
              thinBars.push(`
                <rect x="${x-barHeight/2}" y="${y-barWidth/2}" width="${barHeight}" height="${barWidth}" fill="#E0E0E0"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${thinBars.join('')}
          </g>
        `;
        break;
      
      case 'CirclesOnSticks':
        // Circles on sticks pattern (lollipop-like)
        const circlesOnSticks = [];
        const cosSpacing = 35;
        
        for (let row = 0; row < Math.ceil(frame.height / cosSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / cosSpacing); col++) {
            const x = col * cosSpacing + cosSpacing/2;
            const y = row * cosSpacing + cosSpacing/2;
            
            // Create circle with stick
            circlesOnSticks.push(`
              <circle cx="${x}" cy="${y-6}" r="5" fill="#E0E0E0"/>
              <line x1="${x}" y1="${y}" x2="${x}" y2="${y+8}" stroke="#D8D8D8" stroke-width="2"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${circlesOnSticks.join('')}
          </g>
        `;
        break;
      
      case 'NestedTriangles':
        // Nested triangles pattern
        const nestedTriangles = [];
        const ntSpacing = 40;
        
        for (let row = 0; row < Math.ceil(frame.height / ntSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / ntSpacing); col++) {
            const x = col * ntSpacing + ntSpacing/2;
            const y = row * ntSpacing + ntSpacing/2;
            
            // Create nested triangles
            nestedTriangles.push(`
              <polygon points="${x},${y-12} ${x-10},${y+6} ${x+10},${y+6}" 
                       stroke="#E0E0E0" stroke-width="1" fill="none"/>
              <polygon points="${x},${y-6} ${x-5},${y+3} ${x+5},${y+3}" 
                       stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${nestedTriangles.join('')}
          </g>
        `;
        break;
      
      case 'DotRingCombo':
        // Dot and ring combo pattern
        const dotRingCombo = [];
        const drcSpacing = 35;
        
        for (let row = 0; row < Math.ceil(frame.height / drcSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / drcSpacing); col++) {
            const x = col * drcSpacing + drcSpacing/2;
            const y = row * drcSpacing + drcSpacing/2;
            
            // Create dot with surrounding ring
            dotRingCombo.push(`
              <circle cx="${x}" cy="${y}" r="8" stroke="#E0E0E0" stroke-width="1" fill="none"/>
              <circle cx="${x}" cy="${y}" r="3" fill="#D8D8D8"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${dotRingCombo.join('')}
          </g>
        `;
        break;
      
      case 'ArchRows':
        // Arch rows pattern
        const archRows = [];
        const archRowHeight = 25;
        const archWidth = 20;
        
        for (let y = archRowHeight; y < frame.height; y += archRowHeight) {
          for (let x = archWidth/2; x < frame.width; x += archWidth) {
            // Create U-shaped arches in rows
            archRows.push(`
              <path d="M ${x-archWidth/2} ${y} Q ${x} ${y-15} ${x+archWidth/2} ${y}" 
                    stroke="#E0E0E0" stroke-width="1" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${archRows.join('')}
          </g>
        `;
        break;
      
      case 'CircleSlices':
        // Circle slices pattern (Pac-Man-like)
        const circleSlices = [];
        const sliceSpacing = 40;
        const sliceRadius = 12;
        
        for (let row = 0; row < Math.ceil(frame.height / sliceSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / sliceSpacing); col++) {
            const x = col * sliceSpacing + sliceSpacing/2;
            const y = row * sliceSpacing + sliceSpacing/2;
            
            // Create quarter circle in different orientations
            const variant = (row + col) % 4;
            const startAngle = variant * 90; // 0, 90, 180, or 270 degrees
            const endAngle = startAngle + 270; // Draw 3/4 of a circle (leaving 1/4 open)
            
            const startRad = startAngle * Math.PI / 180;
            const endRad = endAngle * Math.PI / 180;
            
            // Create the arc path
            const largeArcFlag = 1; // 270 degrees is > 180
            const startX = x + sliceRadius * Math.cos(startRad);
            const startY = y + sliceRadius * Math.sin(startRad);
            const endX = x + sliceRadius * Math.cos(endRad);
            const endY = y + sliceRadius * Math.sin(endRad);
            
            circleSlices.push(`
              <path d="M ${x} ${y} L ${startX} ${startY} A ${sliceRadius} ${sliceRadius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z" 
                    fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${circleSlices.join('')}
          </g>
        `;
        break;
      
      case 'DotsInCircle':
        // Dots in circle pattern
        const dotsInCircle = [];
        const dicSpacing = 45;
        const dicOuterRadius = 15;
        const dicDotRadius = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / dicSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / dicSpacing); col++) {
            const x = col * dicSpacing + dicSpacing/2;
            const y = row * dicSpacing + dicSpacing/2;
            
            // Create circle
            dotsInCircle.push(`<circle cx="${x}" cy="${y}" r="${dicOuterRadius}" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
            
            // Add dots around the circle
            const dotCount = 8;
            for (let i = 0; i < dotCount; i++) {
              const angle = (i / dotCount) * Math.PI * 2;
              const dotX = x + Math.cos(angle) * dicOuterRadius * 0.7;
              const dotY = y + Math.sin(angle) * dicOuterRadius * 0.7;
              
              dotsInCircle.push(`<circle cx="${dotX}" cy="${dotY}" r="${dicDotRadius}" fill="#E0E0E0"/>`);
            }
          }
        }
        
        pattern = `
          <g>
            ${dotsInCircle.join('')}
          </g>
        `;
        break;
      
      case 'HalfCircles':
        // Half circles pattern
        const halfCircles = [];
        const hcSpacing = 35;
        const hcRadius = 10;
        
        for (let row = 0; row < Math.ceil(frame.height / hcSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / hcSpacing); col++) {
            const x = col * hcSpacing + hcSpacing/2;
            const y = row * hcSpacing + hcSpacing/2;
            
            // Create semi-circles in alternating orientations
            const variant = (row + col) % 4;
            let path;
            
            if (variant === 0) {
              // Top half
              path = `M ${x-hcRadius} ${y} A ${hcRadius} ${hcRadius} 0 0 1 ${x+hcRadius} ${y} Z`;
            } else if (variant === 1) {
              // Right half
              path = `M ${x} ${y-hcRadius} A ${hcRadius} ${hcRadius} 0 0 1 ${x} ${y+hcRadius} Z`;
            } else if (variant === 2) {
              // Bottom half
              path = `M ${x-hcRadius} ${y} A ${hcRadius} ${hcRadius} 0 0 0 ${x+hcRadius} ${y} Z`;
            } else {
              // Left half
              path = `M ${x} ${y-hcRadius} A ${hcRadius} ${hcRadius} 0 0 0 ${x} ${y+hcRadius} Z`;
            }
            
            halfCircles.push(`<path d="${path}" fill="#E0E0E0" opacity="0.8"/>`);
          }
        }
        
        pattern = `
          <g>
            ${halfCircles.join('')}
          </g>
        `;
        break;
      
      case 'DiamondGrid':
        // Diamond grid pattern (rotated squares)
        const diamondGrid = [];
        const dgSpacing = 35;
        const diamondSize = 12;
        
        for (let row = 0; row < Math.ceil(frame.height / dgSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / dgSpacing); col++) {
            const x = col * dgSpacing + dgSpacing/2;
            const y = row * dgSpacing + dgSpacing/2;
            
            // Create diamond (rotated square)
            diamondGrid.push(`
              <rect x="${x-diamondSize/2}" y="${y-diamondSize/2}" 
                    width="${diamondSize}" height="${diamondSize}" 
                    transform="rotate(45 ${x} ${y})"
                    stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${diamondGrid.join('')}
          </g>
        `;
        break;
      
      case 'ThinRings':
        // Thin rings pattern
        const thinRings = [];
        const ringSpacing = 40;
        
        for (let row = 0; row < Math.ceil(frame.height / ringSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / ringSpacing); col++) {
            const x = col * ringSpacing + ringSpacing/2;
            const y = row * ringSpacing + ringSpacing/2;
            
            // Create thin circle
            thinRings.push(`<circle cx="${x}" cy="${y}" r="10" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
          }
        }
        
        pattern = `
          <g>
            ${thinRings.join('')}
          </g>
        `;
        break;
      
      case 'ZigzagLines':
        // Zigzag lines pattern
        const zigzagLines = [];
        const zigzagSpacing = 25;
        const zigzagWidth = 15;
        const zigzagHeight = 8;
        
        for (let y = zigzagSpacing; y < frame.height; y += zigzagSpacing) {
          // Create horizontal zigzag lines
          let pathD = `M 0 ${y}`;
          
          for (let x = 0; x < frame.width + zigzagWidth; x += zigzagWidth) {
            const yUp = y - zigzagHeight/2;
            const yDown = y + zigzagHeight/2;
            
            pathD += ` L ${x + zigzagWidth/2} ${yUp} L ${x + zigzagWidth} ${y}`;
          }
          
          zigzagLines.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
        
        pattern = `
          <g>
            ${zigzagLines.join('')}
          </g>
        `;
        break;
      
      case 'NestedSquares':
        // Nested squares pattern
        const nestedSquares = [];
        const nsSpacing = 45;
        
        for (let row = 0; row < Math.ceil(frame.height / nsSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / nsSpacing); col++) {
            const x = col * nsSpacing + nsSpacing/2;
            const y = row * nsSpacing + nsSpacing/2;
            
            // Create nested squares
            nestedSquares.push(`
              <rect x="${x-12}" y="${y-12}" width="24" height="24" 
                    stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
              <rect x="${x-6}" y="${y-6}" width="12" height="12" 
                    stroke="#E0E0E0" stroke-width="0.6" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${nestedSquares.join('')}
          </g>
        `;
        break;
      
      case 'CornerBrackets':
        // Corner brackets pattern
        const cornerBrackets = [];
        const cbSpacing = 35;
        const bracketSize = 10;
        
        for (let row = 0; row < Math.ceil(frame.height / cbSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / cbSpacing); col++) {
            const x = col * cbSpacing + cbSpacing/2;
            const y = row * cbSpacing + cbSpacing/2;
            
            // Create L-shaped brackets in 4 corners
            const variant = (row + col) % 4;
            
            if (variant === 0) {
              // Top-left corner
              cornerBrackets.push(`
                <polyline points="${x-bracketSize},${y-bracketSize/2} ${x-bracketSize},${y-bracketSize} ${x-bracketSize/2},${y-bracketSize}" 
                          stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
              `);
            } else if (variant === 1) {
              // Top-right corner
              cornerBrackets.push(`
                <polyline points="${x+bracketSize},${y-bracketSize/2} ${x+bracketSize},${y-bracketSize} ${x+bracketSize/2},${y-bracketSize}" 
                          stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
              `);
            } else if (variant === 2) {
              // Bottom-right corner
              cornerBrackets.push(`
                <polyline points="${x+bracketSize},${y+bracketSize/2} ${x+bracketSize},${y+bracketSize} ${x+bracketSize/2},${y+bracketSize}" 
                          stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
              `);
            } else {
              // Bottom-left corner
              cornerBrackets.push(`
                <polyline points="${x-bracketSize},${y+bracketSize/2} ${x-bracketSize},${y+bracketSize} ${x-bracketSize/2},${y+bracketSize}" 
                          stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${cornerBrackets.join('')}
          </g>
        `;
        break;
      
      case 'TinyHearts':
        // Tiny hearts pattern
        const tinyHearts = [];
        const heartSpacing = 40;
        const heartSize = 6;
        
        for (let row = 0; row < Math.ceil(frame.height / heartSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / heartSpacing); col++) {
            const x = col * heartSpacing + heartSpacing/2;
            const y = row * heartSpacing + heartSpacing/2;
            
            // Create heart shape
            const topY = y - heartSize * 0.4;
            const bottomY = y + heartSize * 0.6;
            const leftX = x - heartSize;
            const rightX = x + heartSize;
            const curveX1 = x - heartSize * 0.5;
            const curveX2 = x + heartSize * 0.5;
            const curveY = y - heartSize * 0.8;
            
            tinyHearts.push(`
              <path d="M ${x} ${bottomY} 
                       C ${leftX} ${topY} ${curveX1} ${curveY} ${x} ${topY} 
                       C ${curveX2} ${curveY} ${rightX} ${topY} ${x} ${bottomY} Z" 
                     fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${tinyHearts.join('')}
          </g>
        `;
        break;
      
      case 'DotDashCombo':
        // Dot and dash combo pattern (like morse code)
        const dotDashCombo = [];
        const ddcSpacing = 25;
        const dashWidth = 10;
        const dashHeight = 2;
        const ddcDotRadius = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / ddcSpacing); row++) {
          // Create horizontal lines of dot-dash patterns
          let xPos = dashWidth;
          while (xPos < frame.width) {
            // Add a dot
            dotDashCombo.push(`<circle cx="${xPos}" cy="${row * ddcSpacing + ddcSpacing/2}" r="${ddcDotRadius}" fill="#E0E0E0"/>`);
            xPos += dashWidth;
            
            // Skip if we're out of space
            if (xPos >= frame.width) break;
            
            // Add a dash
            dotDashCombo.push(`
              <rect x="${xPos-dashWidth/2}" y="${row * ddcSpacing + ddcSpacing/2 - dashHeight/2}" 
                    width="${dashWidth}" height="${dashHeight}" fill="#E0E0E0"/>
            `);
            xPos += dashWidth * 1.5;
          }
        }
        
        pattern = `
          <g>
            ${dotDashCombo.join('')}
          </g>
        `;
        break;
      
      case 'TinyRectangles':
        // Tiny rectangles pattern - similar to dots but elongated
        const tinyRects = [];
        const tinyRectsTrSpacing = 15; // Renamed from trSpacing
        const rectWidth = 5;
        const rectHeight = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / tinyRectsTrSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / tinyRectsTrSpacing); col++) {
            const x = col * tinyRectsTrSpacing + tinyRectsTrSpacing/2;
            const y = row * tinyRectsTrSpacing + tinyRectsTrSpacing/2;
            
            // Alternate horizontal and vertical orientation
            const isHorizontal = (row + col) % 2 === 0;
            
            if (isHorizontal) {
              tinyRects.push(`
                <rect x="${x-rectWidth/2}" y="${y-rectHeight/2}" width="${rectWidth}" height="${rectHeight}" fill="#E0E0E0"/>
              `);
            } else {
              tinyRects.push(`
                <rect x="${x-rectHeight/2}" y="${y-rectWidth/2}" width="${rectHeight}" height="${rectWidth}" fill="#E0E0E0"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${tinyRects.join('')}
          </g>
        `;
        break;
      
      case 'OffsetGrid':
        // Offset grid pattern - regular grid with every other row shifted
        const offsetGrid = [];
        const ogSpacing = 25;
        
        for (let row = 0; row < Math.ceil(frame.height / ogSpacing) + 1; row++) {
          const isOffsetRow = row % 2 === 1;
          const offset = isOffsetRow ? ogSpacing / 2 : 0;
          
          // Horizontal lines
          offsetGrid.push(`
            <line x1="0" y1="${row * ogSpacing}" x2="${frame.width}" y2="${row * ogSpacing}" 
                  stroke="#DADADA" stroke-width="1"/>
          `);
          
          // Vertical lines with offset for odd rows
          for (let col = 0; col < Math.ceil(frame.width / ogSpacing) + 1; col++) {
            const x = col * ogSpacing + offset;
            if (x <= frame.width) {
              offsetGrid.push(`
                <line x1="${x}" y1="${row * ogSpacing}" x2="${x}" y2="${(row+1) * ogSpacing}" 
                      stroke="#DADADA" stroke-width="1"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${offsetGrid.join('')}
          </g>
        `;
        break;
      
      case 'BeanShapes':
        // Bean shapes pattern - soft oval blobs
        const beanShapes = [];
        const bsSpacing = 35;
        
        for (let row = 0; row < Math.ceil(frame.height / bsSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / bsSpacing); col++) {
            const x = col * bsSpacing + bsSpacing/2;
            const y = row * bsSpacing + bsSpacing/2;
            
            // Rotate beans in different directions
            const rotation = ((row + col) % 4) * 90;
            
            beanShapes.push(`
              <g transform="translate(${x}, ${y}) rotate(${rotation})">
                <path d="M -8,0 C -8,-6 -3,-10 2,-8 C 7,-6 10,0 8,4 C 6,8 0,8 -4,6 C -8,4 -8,0 -8,0 Z" 
                      fill="#E0E0E0"/>
              </g>
            `);
          }
        }
        
        pattern = `
          <g>
            ${beanShapes.join('')}
          </g>
        `;
        break;
      
      case 'CornerDots':
        // Corner dots pattern - dots in corners of invisible squares
        const cornerDots = [];
        const cdSpacing = 25;
        const cdRadius = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / cdSpacing) + 1; row++) {
          for (let col = 0; col < Math.ceil(frame.width / cdSpacing) + 1; col++) {
            const x = col * cdSpacing;
            const y = row * cdSpacing;
            
            cornerDots.push(`<circle cx="${x}" cy="${y}" r="${cdRadius}" fill="#E0E0E0"/>`);
          }
        }
        
        pattern = `
          <g>
            ${cornerDots.join('')}
          </g>
        `;
        break;
      
      case 'TriangleStack':
        // Triangle stack pattern - layered upward triangles
        const triangleStack = [];
        const tsSpacing = 40;
        
        for (let row = 0; row < Math.ceil(frame.height / tsSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / tsSpacing); col++) {
            const x = col * tsSpacing + tsSpacing/2;
            const y = row * tsSpacing + tsSpacing/2;
            
            // Create three stacked triangles of different sizes
            triangleStack.push(`
              <polygon points="${x},${y-12} ${x-10},${y+6} ${x+10},${y+6}" 
                       fill="#F0F0F0" stroke="#E0E0E0" stroke-width="0.5"/>
              <polygon points="${x},${y-8} ${x-7},${y+4} ${x+7},${y+4}" 
                       fill="#E8E8E8" stroke="#E0E0E0" stroke-width="0.5"/>
              <polygon points="${x},${y-4} ${x-4},${y+2} ${x+4},${y+2}" 
                       fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.5"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${triangleStack.join('')}
          </g>
        `;
        break;
      
      case 'HalfDiamonds':
        // Half diamonds pattern
        const halfDiamonds = [];
        const hdSpacing = 30;
        const hdSize = 12;
        
        for (let row = 0; row < Math.ceil(frame.height / hdSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / hdSpacing); col++) {
            const x = col * hdSpacing + hdSpacing/2;
            const y = row * hdSpacing + hdSpacing/2;
            
            // Alternate between top and bottom halves
            const variant = (row + col) % 2;
            
            if (variant === 0) {
              // Top half
              halfDiamonds.push(`
                <path d="M ${x} ${y-hdSize/2} L ${x+hdSize/2} ${y} L ${x} ${y+hdSize/2} L ${x-hdSize/2} ${y} Z" 
                      fill="#E0E0E0" clip-path="polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)"/>
              `);
            } else {
              // Bottom half
              halfDiamonds.push(`
                <path d="M ${x} ${y-hdSize/2} L ${x+hdSize/2} ${y} L ${x} ${y+hdSize/2} L ${x-hdSize/2} ${y} Z" 
                      fill="#E0E0E0" clip-path="polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${halfDiamonds.join('')}
          </g>
        `;
        break;
      
      case 'RoundedSquares':
        // Rounded squares pattern
        const roundedSquares = [];
        const rsSpacing = 35;
        const rsSize = 14;
        const rsRadius = 3;
        
        for (let row = 0; row < Math.ceil(frame.height / rsSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / rsSpacing); col++) {
            const x = col * rsSpacing + rsSpacing/2;
            const y = row * rsSpacing + rsSpacing/2;
            
            roundedSquares.push(`
              <rect x="${x-rsSize/2}" y="${y-rsSize/2}" width="${rsSize}" height="${rsSize}" 
                    rx="${rsRadius}" ry="${rsRadius}" 
                    stroke="#E0E0E0" stroke-width="1" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${roundedSquares.join('')}
          </g>
        `;
        break;
      
      case 'PetalShapes':
        // Petal shapes pattern - simple flower petals
        const petalShapes = [];
        const psSpacing = 40;
        const petalRadius = 8;
        
        for (let row = 0; row < Math.ceil(frame.height / psSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / psSpacing); col++) {
            const x = col * psSpacing + psSpacing/2;
            const y = row * psSpacing + psSpacing/2;
            
            // Create 4-petal flower shape
            petalShapes.push(`
              <path d="M ${x} ${y-petalRadius} Q ${x+petalRadius*0.7} ${y-petalRadius*0.7} ${x+petalRadius} ${y} Q ${x+petalRadius*0.7} ${y+petalRadius*0.7} ${x} ${y+petalRadius} Q ${x-petalRadius*0.7} ${y+petalRadius*0.7} ${x-petalRadius} ${y} Q ${x-petalRadius*0.7} ${y-petalRadius*0.7} ${x} ${y-petalRadius} Z" 
                      fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${petalShapes.join('')}
          </g>
        `;
        break;
      
      case 'AngledChevrons':
        // Angled chevrons pattern - V shapes tilted
        const angledChevrons = [];
        const acSpacing = 30;
        const acSize = 8;
        
        for (let row = 0; row < Math.ceil(frame.height / acSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / acSpacing); col++) {
            const x = col * acSpacing + acSpacing/2;
            const y = row * acSpacing + acSpacing/2;
            
            // Alternate between left-tilted and right-tilted chevrons
            const tiltRight = (row + col) % 2 === 0;
            const rotate = tiltRight ? 15 : -15;
            
            angledChevrons.push(`
              <g transform="translate(${x}, ${y}) rotate(${rotate})">
                <polyline points="${-acSize},${-acSize/2} 0,${acSize/2} ${acSize},${-acSize/2}" 
                          stroke="#E0E0E0" stroke-width="1.5" fill="none"/>
              </g>
            `);
          }
        }
        
        pattern = `
          <g>
            ${angledChevrons.join('')}
          </g>
        `;
        break;
      
      case 'EllipseLines':
        // Ellipse lines pattern - skinny stretched ovals
        const ellipseLines = [];
        const elSpacing = 30;
        const elWidth = 15;
        const elHeight = 4;
        
        for (let row = 0; row < Math.ceil(frame.height / elSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / elSpacing); col++) {
            const x = col * elSpacing + elSpacing/2;
            const y = row * elSpacing + elSpacing/2;
            
            // Alternate horizontal and vertical orientations
            const isHorizontal = (row + col) % 2 === 0;
            
            if (isHorizontal) {
              ellipseLines.push(`
                <ellipse cx="${x}" cy="${y}" rx="${elWidth/2}" ry="${elHeight/2}" fill="#E0E0E0"/>
              `);
            } else {
              ellipseLines.push(`
                <ellipse cx="${x}" cy="${y}" rx="${elHeight/2}" ry="${elWidth/2}" fill="#E0E0E0"/>
              `);
            }
          }
        }
        
        pattern = `
          <g>
            ${ellipseLines.join('')}
          </g>
        `;
        break;
      
      case 'DashedCircles':
        // Dashed circles pattern
        const dashedCircles = [];
        const dcSpacing = 45;
        const dcRadius = 12;
        
        for (let row = 0; row < Math.ceil(frame.height / dcSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / dcSpacing); col++) {
            const x = col * dcSpacing + dcSpacing/2;
            const y = row * dcSpacing + dcSpacing/2;
            
            dashedCircles.push(`
              <circle cx="${x}" cy="${y}" r="${dcRadius}" 
                      stroke="#E0E0E0" stroke-width="1" stroke-dasharray="3,3" fill="none"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${dashedCircles.join('')}
          </g>
        `;
        break;
      
      case 'TornPaperEdge':
        // Torn paper edge pattern - jagged repeating line
        const tornEdges = [];
        const teSpacing = 25;
        const teHeight = 10;
        
        for (let y = teSpacing; y < frame.height; y += teSpacing) {
          // Create a jagged path
          let pathD = `M 0 ${y}`;
          
          for (let x = 0; x < frame.width; x += 15) {
            const yOffset = Math.sin(x * 0.2) * (teHeight/2);
            const midX = x + 7.5;
            pathD += ` L ${midX} ${y + yOffset} L ${x + 15} ${y}`;
          }
          
          tornEdges.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
        
        pattern = `
          <g>
            ${tornEdges.join('')}
          </g>
        `;
        break;
      
      case 'SpiralLoops':
        // Spiral loops pattern - tiny curly coils
        const spiralLoops = [];
        const slSpacing = 35;
        
        for (let row = 0; row < Math.ceil(frame.height / slSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / slSpacing); col++) {
            const x = col * slSpacing + slSpacing/2;
            const y = row * slSpacing + slSpacing/2;
            
            // Create a spiral path with 3 loops
            let pathD = `M ${x+6} ${y}`;
            
            for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
              const radius = 6 * (1 - angle / (Math.PI * 6));
              const px = x + radius * Math.cos(angle);
              const py = y + radius * Math.sin(angle);
              pathD += ` L ${px} ${py}`;
            }
            
            spiralLoops.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
          }
        }
        
        pattern = `
          <g>
            ${spiralLoops.join('')}
          </g>
        `;
        break;
      
      case 'ArrowRepeat':
        // Arrow repeat pattern - simple arrowheads all pointing same way
        const arrowRepeat = [];
        const arSpacing = 30;
        const arSize = 8;
        
        for (let row = 0; row < Math.ceil(frame.height / arSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / arSpacing); col++) {
            const x = col * arSpacing + arSpacing/2;
            const y = row * arSpacing + arSpacing/2;
            
            // All arrows point right
            arrowRepeat.push(`
              <polygon points="${x-arSize/2},${y-arSize/2} ${x+arSize/2},${y} ${x-arSize/2},${y+arSize/2}" 
                       fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${arrowRepeat.join('')}
          </g>
        `;
        break;
      
      case 'CornerCutShapes':
        // Corner cut shapes - squares with a corner snipped off
        const cornerCutShapes = [];
        const ccsSpacing = 35;
        const ccsSize = 16;
        
        for (let row = 0; row < Math.ceil(frame.height / ccsSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / ccsSpacing); col++) {
            const x = col * ccsSpacing + ccsSpacing/2;
            const y = row * ccsSpacing + ccsSpacing/2;
            
            // Rotate the cut to different corners based on position
            const cornerToCut = (row + col) % 4;
            let pathD;
            
            if (cornerToCut === 0) {
              // Top-left corner cut
              pathD = `M ${x-ccsSize/3} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y-ccsSize/3} Z`;
            } else if (cornerToCut === 1) {
              // Top-right corner cut
              pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/3} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/3} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} Z`;
            } else if (cornerToCut === 2) {
              // Bottom-right corner cut
              pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/3} L ${x+ccsSize/3} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} Z`;
            } else {
              // Bottom-left corner cut
              pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/3} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/3} Z`;
            }
            
            cornerCutShapes.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
          }
        }
        
        pattern = `
          <g>
            ${cornerCutShapes.join('')}
          </g>
        `;
        break;
      
      case 'StepPattern':
        // Step pattern - stairs going up and down in a wave
        const stepPattern = [];
        const spSpacing = 20;
        const spHeight = 15;
        
        for (let y = spSpacing; y < frame.height; y += spHeight * 2) {
          // Create a step path going across
          let pathD = `M 0 ${y}`;
          
          let currentY = y;
          for (let x = 0; x < frame.width; x += spSpacing) {
            if (x % (spSpacing * 2) === 0) {
              // Step up
              pathD += ` L ${x} ${currentY} L ${x} ${currentY - spHeight} `;
              currentY -= spHeight;
            } else {
              // Step down
              pathD += ` L ${x} ${currentY} L ${x} ${currentY + spHeight} `;
              currentY += spHeight;
            }
          }
          
          // Finish the path
          pathD += ` L ${frame.width} ${currentY}`;
          
          stepPattern.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
        
        pattern = `
          <g>
            ${stepPattern.join('')}
          </g>
        `;
        break;
      
      case 'RippleDots':
        // Ripple dots pattern - small dot inside a ring
        const rippleDots = [];
        const rdSpacing = 30;
        const rdOuterRadius = 8;
        const rdInnerRadius = 2;
        
        for (let row = 0; row < Math.ceil(frame.height / rdSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / rdSpacing); col++) {
            const x = col * rdSpacing + rdSpacing/2;
            const y = row * rdSpacing + rdSpacing/2;
            
            rippleDots.push(`
              <circle cx="${x}" cy="${y}" r="${rdOuterRadius}" stroke="#E0E0E0" stroke-width="1" fill="none"/>
              <circle cx="${x}" cy="${y}" r="${rdInnerRadius}" fill="#E0E0E0"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${rippleDots.join('')}
          </g>
        `;
        break;
      
      case 'HexRing':
        // Hex ring pattern - hexagon outlines with smaller hex inside
        const hexRing = [];
        const hrSpacing = 40;
        const outerSize = 15;
        const innerSize = 8;
        
        for (let row = 0; row < Math.ceil(frame.height / hrSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / hrSpacing); col++) {
            const x = col * hrSpacing + (row % 2 ? hrSpacing/2 : 0) + hrSpacing/2;
            const y = row * hrSpacing + hrSpacing/2;
            
            // Generate points for outer hexagon
            const outerPoints = [];
            const innerPoints = [];
            
            for (let i = 0; i < 6; i++) {
              const angle = (60 * i - 30) * Math.PI / 180;
              outerPoints.push(`${x + outerSize * Math.cos(angle)},${y + outerSize * Math.sin(angle)}`);
              innerPoints.push(`${x + innerSize * Math.cos(angle)},${y + innerSize * Math.sin(angle)}`);
            }
            
            hexRing.push(`
              <polygon points="${outerPoints.join(' ')}" fill="none" stroke="#E0E0E0" stroke-width="1"/>
              <polygon points="${innerPoints.join(' ')}" fill="none" stroke="#E0E0E0" stroke-width="0.8"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${hexRing.join('')}
          </g>
        `;
        break;
      
      case 'FlowerGrid':
        // Flower grid pattern - simple 4-petal flowers
        const flowerGrid = [];
        const fgSpacing = 35;
        const petalSize = 6;
        
        for (let row = 0; row < Math.ceil(frame.height / fgSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / fgSpacing); col++) {
            const x = col * fgSpacing + fgSpacing/2;
            const y = row * fgSpacing + fgSpacing/2;
            
            // Create 4 ellipses for petals
            flowerGrid.push(`
              <ellipse cx="${x}" cy="${y-petalSize/2}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(0 ${x} ${y})"/>
              <ellipse cx="${x+petalSize/2}" cy="${y}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(90 ${x} ${y})"/>
              <ellipse cx="${x}" cy="${y+petalSize/2}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(0 ${x} ${y})"/>
              <ellipse cx="${x-petalSize/2}" cy="${y}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(90 ${x} ${y})"/>
              <circle cx="${x}" cy="${y}" r="${petalSize/4}" fill="#D8D8D8"/>
            `);
          }
        }
        
        pattern = `
          <g>
            ${flowerGrid.join('')}
          </g>
        `;
        break;
      
      case 'TwistRibbons':
        // Twist Ribbons pattern
        const twistRibbons = [];
        const twistRibbonsTrSpacing = 40; // Renamed from trSpacing
        const ribbonWidth = 2;
        const ribbonAmplitude = 15;
        
        for (let y = twistRibbonsTrSpacing / 2; y < frame.height; y += twistRibbonsTrSpacing) {
          let pathD = `M 0 ${y}`;
          let pathD2 = `M 0 ${y + ribbonWidth}`;
          for (let x = 0; x < frame.width; x += 15) {
            const yOffset = Math.sin(x * 0.05 + y * 0.03) * ribbonAmplitude;
            pathD += ` Q ${x+7.5} ${y+yOffset+ribbonWidth/2}, ${x+15} ${y+yOffset}`;
            pathD2 += ` Q ${x+7.5} ${y+yOffset+ribbonWidth*1.5}, ${x+15} ${y+yOffset+ribbonWidth}`;
          }
          twistRibbons.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
          twistRibbons.push(`<path d="${pathD2}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
          // Potentially add fill between paths or use a thicker stroke with gradients in future
        }
        
        pattern = `
          <g>
            ${twistRibbons.join('')}
          </g>
        `;
        break;
      
      case 'BounceDots':
        // Bounce Dots pattern
        const bounceDots = [];
        const bdSpacingX = 25;
        const bdAmplitude = frame.height * 0.15;
        const bdFrequency = 0.08;
        
        for (let x = bdSpacingX; x < frame.width; x += bdSpacingX) {
          const yOffset = Math.abs(Math.sin(x * bdFrequency)) * bdAmplitude;
          const y = frame.height * 0.8 - yOffset;
          bounceDots.push(`<circle cx="${x}" cy="${y}" r="2.5" fill="#E0E0E0"/>`);
        }
        
        pattern = `
          <g>
            ${bounceDots.join('')}
          </g>
        `;
        break;
      
      case 'OrbitPaths':
        // Orbit Paths pattern
        const orbitPaths = [];
        const opSpacing = 60;
        const opRX = 20;
        const opRY = 12;
        
        for (let row = 0; row < Math.ceil(frame.height / opSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / opSpacing); col++) {
            const x = col * opSpacing + opSpacing/2;
            const y = row * opSpacing + opSpacing/2;
            
            orbitPaths.push(`<ellipse cx="${x}" cy="${y}" rx="${opRX}" ry="${opRY}" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
            // Add a few dots on the orbit
            for (let i = 0; i < 3; i++) {
              const angle = (i / 3) * Math.PI * 2 + (x+y)*0.02; // Offset start angle
              const dotX = x + opRX * Math.cos(angle);
              const dotY = y + opRY * Math.sin(angle);
              orbitPaths.push(`<circle cx="${dotX}" cy="${dotY}" r="2" fill="#D8D8D8"/>`);
            }
          }
        }
        
        pattern = `
          <g>
            ${orbitPaths.join('')}
          </g>
        `;
        break;
      
      case 'OverlappingGrids':
        // Overlapping Grids pattern
        const overlappingGrids = [];
        const ogGridSpacing = 30;
        const offset = 8;
        
        // Grid 1
        overlappingGrids.push(`<g stroke="#DADADA" stroke-width="1">`);
        for (let x = ogGridSpacing; x < frame.width; x += ogGridSpacing) { overlappingGrids.push(`<line x1="${x}" y1="0" x2="${x}" y2="${frame.height}"/>`); }
        for (let y = ogGridSpacing; y < frame.height; y += ogGridSpacing) { overlappingGrids.push(`<line x1="0" y1="${y}" x2="${frame.width}" y2="${y}"/>`); }
        overlappingGrids.push(`</g>`);
        
        // Grid 2 (Offset)
        overlappingGrids.push(`<g stroke="#C8C8C8" stroke-width="1" transform="translate(${offset}, ${offset}) rotate(5)">`);
        for (let x = ogGridSpacing; x < frame.width; x += ogGridSpacing) { overlappingGrids.push(`<line x1="${x}" y1="0" x2="${x}" y2="${frame.height}"/>`); }
        for (let y = ogGridSpacing; y < frame.height; y += ogGridSpacing) { overlappingGrids.push(`<line x1="0" y1="${y}" x2="${frame.width}" y2="${y}"/>`); }
        overlappingGrids.push(`</g>`);
        
        pattern = `
          <g>
            ${overlappingGrids.join('')}
          </g>
        `;
        break;
      
      case 'RaindropScatter':
        // Raindrop Scatter pattern
        const raindropScatter = [];
        const dropCount = 80;
        
        for (let i = 0; i < dropCount; i++) {
          const x = Math.round((((i * 13) % 29) / 29) * frame.width);
          const y = Math.round((((i * 19) % 31) / 31) * frame.height);
          const size = 4 + ((i % 5) * 1.5);
          const rotation = 160 + Math.sin(i*0.5)*20; // Pointing mostly down
          
          // Teardrop shape path
          raindropScatter.push(`
            <path d="M 0 ${-size*1.5} C ${size} ${-size*1.5} ${size} ${size*0.5} 0 ${size*0.5} C ${-size} ${size*0.5} ${-size} ${-size*1.5} 0 ${-size*1.5} Z" 
                  transform="translate(${x}, ${y}) rotate(${rotation}) scale(0.8)" fill="#E0E0E0"/>
          `);
        }
        
        pattern = `
          <g>
            ${raindropScatter.join('')}
          </g>
        `;
        break;
      
      case 'SunburstLines':
        // Sunburst Lines pattern
        const sunburstLines = [];
        const centerX = frame.width / 2;
        const centerY = frame.height / 2;
        const numLines = 48;
        const maxLength = Math.max(frame.width, frame.height) * 0.7;
        
        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * Math.PI * 2;
          const x2 = centerX + Math.cos(angle) * maxLength;
          const y2 = centerY + Math.sin(angle) * maxLength;
          sunburstLines.push(`<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" stroke="#E0E0E0" stroke-width="1"/>`);
        }
        
        pattern = `
          <g>
            ${sunburstLines.join('')}
          </g>
        `;
        break;
      
      case 'PebbleFloor':
        // Pebble Floor pattern
        const pebbleFloor = [];
        const pfSpacing = 25;
        
        for (let row = 0; row < Math.ceil(frame.height / pfSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / pfSpacing); col++) {
            const x = col * pfSpacing + pfSpacing/2;
            const y = row * pfSpacing + pfSpacing/2;
            const sizeX = 6 + Math.sin(x * 0.1 + y * 0.05) * 3;
            const sizeY = 6 + Math.cos(y * 0.1 + x * 0.05) * 3;
            const rotation = (x + y) * 2;
            pebbleFloor.push(`<ellipse cx="${x}" cy="${y}" rx="${sizeX}" ry="${sizeY}" transform="rotate(${rotation} ${x} ${y})" fill="#E0E0E0"/>`);
          }
        }
        
        pattern = `
          <g>
            ${pebbleFloor.join('')}
          </g>
        `;
        break;
      
      case 'PixelBlocks':
        // Pixel Blocks pattern
        const pixelBlocks = [];
        const pbSpacing = 30; // Increased spacing
        const blockSize = 6; // Increased size
        for (let row = 0; row < Math.ceil(frame.height / pbSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / pbSpacing); col++) {
            const x = col * pbSpacing + pbSpacing/2;
            const y = row * pbSpacing + pbSpacing/2;
            const clusterType = (row + col) % 3;
            if (clusterType === 0) { // 2x2 Block
              pixelBlocks.push(`<rect x=\"${x-blockSize}\" y=\"${y-blockSize}\" width=\"${blockSize*2}\" height=\"${blockSize*2}\" fill=\"#E0E0E0\"/>`);
            } else if (clusterType === 1) { // L-shape
              pixelBlocks.push(`<rect x=\"${x}\" y=\"${y-blockSize}\" width=\"${blockSize}\" height=\"${blockSize*2}\" fill=\"#E0E0E0\"/>`);
              pixelBlocks.push(`<rect x=\"${x-blockSize}\" y=\"${y}\" width=\"${blockSize}\" height=\"${blockSize}\" fill=\"#E0E0E0\"/>`);
            }
            // Type 2 leaves a gap
          }
        }
        pattern = `
          <g>
            ${pixelBlocks.join('\\n')}
          </g>
        `;
        break;

      case 'TriangleSpirals':
        // Triangle Spirals pattern
        const triangleSpirals = [];
        const tsSpiralCount = Math.ceil(frame.width / 250); // Adjust count based on width
        const trianglesPerSpiral = 25; // Increased count
        const tsMaxRadius = Math.min(frame.width, frame.height) / (tsSpiralCount * 1.5); // Adjust radius
        
        for (let spiral = 0; spiral < tsSpiralCount; spiral++) {
          const centerX = frame.width * (spiral + 0.5) / tsSpiralCount;
          const centerY = frame.height / 2; // Center vertically
          for (let i = 0; i < trianglesPerSpiral; i++) {
            const angle = i * 0.7; // Adjusted angle step
            const radius = (i / trianglesPerSpiral) * tsMaxRadius;
            const triX = centerX + Math.cos(angle) * radius;
            const triY = centerY + Math.sin(angle) * radius;
            const triSize = 4 + i * 0.4; // Increased size
            triangleSpirals.push(`<polygon points=\"${triX},${triY-triSize} ${triX-triSize*0.866},${triY+triSize*0.5} ${triX+triSize*0.866},${triY+triSize*0.5}\" transform=\"rotate(${angle*60} ${triX} ${triY})\" fill=\"#E0E0E0\"/>`);
          }
        }
        pattern = `
          <g>
            ${triangleSpirals.join('\\n')}
          </g>
        `;
        break;

      case 'OffsetCubes':
        // Offset Cubes pattern
        const offsetCubes = [];
        const ocSize = 15; // Increased size
        const ocSpacingX = ocSize * 1.732;
        const ocSpacingY = ocSize * 1.5;
        for (let row = -1; row < Math.ceil(frame.height / ocSpacingY) + 1; row++) {
          for (let col = -1; col < Math.ceil(frame.width / ocSpacingX) + 1; col++) {
            const x = col * ocSpacingX + (row % 2) * (ocSpacingX / 2);
            const y = row * ocSpacingY;
            // Draw top, left, right faces
            offsetCubes.push(`<polygon points=\"${x},${y} ${x+ocSpacingX/2},${y-ocSize/2} ${x},${y-ocSize} ${x-ocSpacingX/2},${y-ocSize/2} Z\" fill=\"#F0F0F0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Top
            offsetCubes.push(`<polygon points=\"${x},${y} ${x-ocSpacingX/2},${y-ocSize/2} ${x-ocSpacingX/2},${y+ocSize/2} ${x},${y+ocSize} Z\" fill=\"#E0E0E0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Left
            offsetCubes.push(`<polygon points=\"${x},${y} ${x+ocSpacingX/2},${y-ocSize/2} ${x+ocSpacingX/2},${y+ocSize/2} ${x},${y+ocSize} Z\" fill=\"#D0D0D0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Right
          }
        }
        pattern = `
          <g>
            ${offsetCubes.join('\\n')}
          </g>
        `;
        break;

      case 'InterlockingRings':
        // Interlocking Rings pattern
        const interlockingRings = [];
        const irSpacingX = 25; // Increased spacing
        const irSpacingY = 18; // Increased spacing
        const irRadius = 15; // Increased radius
        for (let row = 0; row < Math.ceil(frame.height / irSpacingY); row++) {
          for (let col = 0; col < Math.ceil(frame.width / irSpacingX); col++) {
            const x = col * irSpacingX + (row % 2 ? irSpacingX / 2 : 0);
            const y = row * irSpacingY;
            interlockingRings.push(`<circle cx=\"${x}\" cy=\"${y}\" r=\"${irRadius}\" stroke=\"#E0E0E0\" stroke-width=\"1.2\" fill=\"none\"/>`); // Increased stroke-width
          }
        }
        pattern = `
          <g>
            ${interlockingRings.join('\\n')}
          </g>
        `;
        break;

      case '3DZigzags':
        // 3D Zigzags pattern
        const threeDZigzags = [];
        const zzSpacing = 30; // Increased spacing
        const zzHeight = 12; // Increased size
        const zzDepth = 4; // Increased depth
        for (let y = zzSpacing; y < frame.height; y += zzSpacing * 1.5) {
          let pathD = `M 0 ${y}`;
          let shadowD = `M ${zzDepth} ${y + zzDepth}`;
          for (let x = 0; x < frame.width; x += zzHeight * 2) {
            pathD += ` L ${x+zzHeight} ${y-zzHeight/2} L ${x+zzHeight*2} ${y}`;
            shadowD += ` L ${x+zzHeight+zzDepth} ${y-zzHeight/2+zzDepth} L ${x+zzHeight*2+zzDepth} ${y+zzDepth}`;
          }
          threeDZigzags.push(`<path d=\"${shadowD}\" stroke=\"#C8C8C8\" stroke-width=\"1\" fill=\"none\"/>`);
          threeDZigzags.push(`<path d=\"${pathD}\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
        }
        pattern = `
          <g>
            ${threeDZigzags.join('\\n')}
          </g>
        `;
        break;

      case 'DoodleLoops':
        // Doodle Loops pattern
        const doodleLoops = [];
        const doodleLoopsDlSpacing = 40; // Renamed from dlSpacing
        for (let row = 0; row < Math.ceil(frame.height / doodleLoopsDlSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / doodleLoopsDlSpacing); col++) {
              const x = col * doodleLoopsDlSpacing + doodleLoopsDlSpacing/2;
              const y = row * doodleLoopsDlSpacing + doodleLoopsDlSpacing/2;
              const rotation = (x + y) * 2; // Simpler rotation
              doodleLoops.push(`<path d=\"M ${x-12} ${y} C ${x-12} ${y-15}, ${x+12} ${y-15}, ${x+12} ${y} S ${x-12} ${y+15}, ${x-12} ${y}\" transform=\"rotate(${rotation} ${x} ${y})\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
          }
        }
        pattern = `
          <g>
            ${doodleLoops.join('\\n')}
          </g>
        `;
        break;

      case 'ThinSlashGrid':
        // Thin Slash Grid pattern
        const thinSlashGrid = [];
        const tsgSpacing = 10; // Increased spacing
        const tsgLineLength = Math.max(frame.width, frame.height) * 1.5; // Renamed from lineLength, ensure lines cover the area
        for (let i = -Math.ceil(frame.height / tsgSpacing) - Math.ceil(frame.width / tsgSpacing); i < Math.ceil(frame.width / tsgSpacing) + Math.ceil(frame.height / tsgSpacing); i++) {
          const startX = i * tsgSpacing;
          // Forward slashes
          thinSlashGrid.push(`<line x1=\"${startX}\" y1=\"0\" x2=\"${startX - tsgLineLength}\" y2=\"${tsgLineLength}\" stroke=\"#D8D8D8\" stroke-width=\"0.7\"/>`);
          // Backward slashes
          thinSlashGrid.push(`<line x1=\"${startX}\" y1=\"0\" x2=\"${startX + tsgLineLength}\" y2=\"${tsgLineLength}\" stroke=\"#D8D8D8\" stroke-width=\"0.7\"/>`);
        }
        pattern = `
          <g>
            ${thinSlashGrid.join('\\n')}
          </g>
        `;
        break;

      case 'ParallelCurves':
        // Parallel Curves pattern
        const parallelCurves = [];
        const pcSpacing = 20; // Increased spacing
        const numCurves = Math.ceil(frame.height / pcSpacing);
        const pcAmplitude = 10; // Renamed from amplitude, Increased amplitude
        const pcFrequency = 0.03; // Renamed from frequency, Adjusted frequency

        for (let i = 0; i < numCurves; i++) {
          const yOffset = i * pcSpacing + pcSpacing / 2;
          let pathD = `M 0 ${yOffset}`;
          for (let x = 0; x <= frame.width; x += 10) {
            const y = yOffset + Math.sin(x * pcFrequency + i * 0.5) * pcAmplitude;
            pathD += ` L ${x} ${y}`;
          }
          parallelCurves.push(`<path d=\"${pathD}\" stroke=\"#E0E0E0\" stroke-width=\"1.2\" fill=\"none\"/>`);
        }
        pattern = `
          <g>
            ${parallelCurves.join('\\n')}
          </g>
        `;
        break;

      case 'StarDotCluster': { // <-- Added opening brace
        // Star + Dot Cluster pattern
        const starDotCluster = [];
        const sdcSpacing = 50; // Increased spacing
        const starSize = 8; // Increased star size
        const dotRadius = 1.5; // Increased dot size
        const dotClusterRadius = 12; // Increased cluster radius

        for (let row = 0; row < Math.ceil(frame.height / sdcSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / sdcSpacing); col++) {
            const x = col * sdcSpacing + sdcSpacing/2;
            const y = row * sdcSpacing + sdcSpacing/2;
            // Star
            starDotCluster.push(`<path d=\"M ${x} ${y-starSize} L ${x+starSize*0.3} ${y-starSize*0.3} L ${x+starSize} ${y} L ${x+starSize*0.3} ${y+starSize*0.3} L ${x} ${y+starSize} L ${x-starSize*0.3} ${y+starSize*0.3} L ${x-starSize} ${y} L ${x-starSize*0.3} ${y-starSize*0.3} Z\" fill=\"#E0E0E0\"/>`);
            // Dots
            for (let i = 0; i < 6; i++) { // Increased dot count
              const angle = (i / 6) * Math.PI * 2 + (x+y)*0.01;
              const dotX = x + Math.cos(angle) * dotClusterRadius;
              const dotY = y + Math.sin(angle) * dotClusterRadius;
              starDotCluster.push(`<circle cx=\"${dotX}\" cy=\"${dotY}\" r=\"${dotRadius}\" fill=\"#D8D8D8\"/>`);
            }
          }
        }
        pattern = `
          <g>
            ${starDotCluster.join('\\n')}
          </g>
        `;
        break;
      } // <-- Added closing brace

      case 'LineLeaf': { // <-- Added opening brace
        // Line & Leaf pattern
        const lineLeaf = [];
        const llLineSpacing = 25; // Increased spacing
        const leafSpacing = 50; // Increased spacing
        const leafScale = 1.0; // Increased scale

        for (let y = llLineSpacing; y < frame.height; y += llLineSpacing) {
          lineLeaf.push(`<line x1=\"0\" y1=\"${y}\" x2=\"${frame.width}\" y2=\"${y}\" stroke=\"#E0E0E0\" stroke-width=\"1\"/>`);
          // Add leaves
          for (let x = leafSpacing; x < frame.width; x += leafSpacing) {
            if ((Math.floor(x / leafSpacing) + Math.floor(y / llLineSpacing)) % 2 === 0) { // Alternate placement
               const leafSize = 4 * leafScale;
               const rotation = (x+y)*3;
               lineLeaf.push(`<path d=\"M ${x} ${y-leafSize*0.25} c -${leafSize*0.75} -${leafSize*0.5} -${leafSize*0.75} -${leafSize*1.25} 0 -${leafSize*1.25} c ${leafSize*0.75} 0 ${leafSize*0.75} ${leafSize*0.75} 0 ${leafSize*1.25} M ${x} ${y-leafSize*0.25} c ${leafSize*0.75} -${leafSize*0.5} ${leafSize*0.75} -${leafSize*1.25} 0 -${leafSize*1.25}\" fill=\"#D8D8D8\" transform=\"rotate(${rotation} ${x} ${y}) scale(${leafScale})\"/>`);
              }
            }
          }
          pattern = `
            <g>
              ${lineLeaf.join('\\n')}
            </g>
          `;
          break;
       } // <-- Added closing brace

      case 'TearGrid': { // <-- Added opening brace
        // Tear Grid pattern
        const tearGrid = [];
        const tgSpacing = 25; // Increased spacing
        const tearSize = 6; // Increased size

        for (let row = 0; row < Math.ceil(frame.height / tgSpacing); row++) {
          for (let col = 0; col < Math.ceil(frame.width / tgSpacing); col++) {
            const x = col * tgSpacing + tgSpacing/2;
            const y = row * tgSpacing + tgSpacing/2;
            const rotation = ((row + col) % 4) * 90 + 15; // Add rotation
            tearGrid.push(`<path d=\"M 0 ${-tearSize*1.5} C ${tearSize} ${-tearSize*1.5} ${tearSize} ${tearSize*0.5} 0 ${tearSize*0.5} C ${-tearSize} ${tearSize*0.5} ${-tearSize} ${-tearSize*1.5} 0 ${-tearSize*1.5} Z\" transform=\"translate(${x}, ${y}) rotate(${rotation}) scale(0.8)\" fill=\"#E0E0E0\"/>`);
          }
        }
        pattern = `
          <g>
            ${tearGrid.join('\\n')}
          </g>
        `;
        break;
      } // <-- Added closing brace

      case 'EyeSymbols': { // <-- Added opening brace
        // Eye Symbols pattern
        const eyeSymbols = [];
        const eyeCount = Math.ceil((frame.width * frame.height) / (60*60)); // Adjust count based on area

        for (let i = 0; i < eyeCount; i++) {
          // Use more structured placement instead of pure random for consistency
          const gridDim = Math.ceil(Math.sqrt(eyeCount));
          const cellWidth = frame.width / gridDim;
          const cellHeight = frame.height / gridDim;
          const gridX = (i % gridDim) * cellWidth;
          const gridY = Math.floor(i / gridDim) * cellHeight;
          
          // Add some random offset within the cell
          const x = gridX + cellWidth * (0.3 + Math.random() * 0.4);
          const y = gridY + cellHeight * (0.3 + Math.random() * 0.4);
          
          const eyeRX = 10; // Increased size
          const eyeRY = 5; // Increased size
          const pupilR = 2.5; // Increased size

          eyeSymbols.push(`<ellipse cx=\"${x}\" cy=\"${y}\" rx=\"${eyeRX}\" ry=\"${eyeRY}\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
          eyeSymbols.push(`<circle cx=\"${x}\" cy=\"${y}\" r=\"${pupilR}\" fill=\"#E0E0E0\"/>`);
        }
        pattern = `
          <g>
            ${eyeSymbols.join('\\n')}
          </g>
        `;
        break;
      } // <-- Added closing brace

      case 'PuzzleGrid': { // <-- Added opening brace
        // Puzzle Grid pattern
        const puzzleGrid = [];
        const pzSize = 40; // Size of each puzzle piece

        for (let row = 0; row < Math.ceil(frame.height / pzSize); row++) {
          for (let col = 0; col < Math.ceil(frame.width / pzSize); col++) {
            const x = col * pzSize;
            const y = row * pzSize;
            
            // Define nub positions (0:none, 1:out, -1:in) pseudo-randomly based on pos
            const topNub = (row > 0) ? (((col + row*3) % 3) - 1) : 0;
            const rightNub = (col < Math.ceil(frame.width / pzSize) - 1) ? (((col*3 + row) % 3) - 1) : 0;
            const bottomNub = (row < Math.ceil(height / pzSize) - 1) ? -topNub : 0; // Ensure matching nub
            const leftNub = (col > 0) ? -((((col-1)*3 + row) % 3) - 1) : 0; // Ensure matching nub from left

            const nW = pzSize * 0.2; // Nub width based on piece size
            const nH = pzSize * 0.15; // Nub height based on piece size
            const c = 0.551915 * nH * 0.5; // Control point calculation factor for circular nub approx

            let pathD = `M ${x} ${y}`;

            // Top Edge
            pathD += ` l ${pzSize*0.35} 0`;
            if (topNub !== 0) {
              pathD += ` l 0 ${-topNub*nH*0.5}`; // Start of nub curve
              pathD += ` c ${nW*0.25} ${-topNub*nH*0.4} ${nW*0.75} ${-topNub*nH*0.4} ${nW} 0`; // Nub arc
              pathD += ` l 0 ${topNub*nH*0.5}`; // End of nub curve
            }
            pathD += ` l ${pzSize*0.35} 0`; // To top-right corner

            // Right Edge
            pathD += ` l 0 ${pzSize*0.35}`;
             if (rightNub !== 0) {
              pathD += ` l ${rightNub*nH*0.5} 0`;
              pathD += ` c ${rightNub*nH*0.4} ${nW*0.25} ${rightNub*nH*0.4} ${nW*0.75} 0 ${nW}`;
              pathD += ` l ${-rightNub*nH*0.5} 0`;
            }
            pathD += ` l 0 ${pzSize*0.35}`; // To bottom-right corner

            // Bottom Edge
            pathD += ` l ${-pzSize*0.35} 0`;
             if (bottomNub !== 0) {
              pathD += ` l 0 ${bottomNub*nH*0.5}`;
              pathD += ` c ${-nW*0.25} ${bottomNub*nH*0.4} ${-nW*0.75} ${bottomNub*nH*0.4} ${-nW} 0`;
              pathD += ` l 0 ${-bottomNub*nH*0.5}`;
            }
            pathD += ` l ${-pzSize*0.35} 0`; // To bottom-left corner

            // Left Edge
            pathD += ` l 0 ${-pzSize*0.35}`;
            if (leftNub !== 0) {
              pathD += ` l ${-leftNub*nH*0.5} 0`;
              pathD += ` c ${-leftNub*nH*0.4} ${-nW*0.25} ${-leftNub*nH*0.4} ${-nW*0.75} 0 ${-nW}`;
              pathD += ` l ${leftNub*nH*0.5} 0`;
            }
            pathD += ` Z`; // Close path (back to top-left)

            puzzleGrid.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="#F0F0F0"/>`);
          }
        }
        pattern = `
          <g>
            ${puzzleGrid.join('')}
          </g>
        `;
        break;
      } // <-- Added closing brace

      // ------------------- NEW PATTERNS START (Batch 2) -------------------

      // Visual Texture / Noise
      case 'GrainNoise': {
        // Generate SVG for Grain Noise using small, semi-transparent circles
        const grains = [];
        const numGrains = Math.floor((frame.width * frame.height) / 150); // Further reduced density
        for (let i = 0; i < numGrains; i++) {
          const x = Math.random() * frame.width;
          const y = Math.random() * frame.height;
          const r = 0.5 + Math.random() * 1;
          const opacity = 0.05 + Math.random() * 0.15;
          grains.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#808080" fill-opacity="${opacity}"/>`);
        }
        pattern = `<g>${grains.join('\n')}</g>`;
        break;
      }

      case 'StaticTVDots': {
        // Generate SVG for Static TV Dots with random dots and occasional lines
        const elements = [];
        const numDots = Math.floor((frame.width * frame.height) / 200); // Further reduced density
        for (let i = 0; i < numDots; i++) {
          const x = Math.random() * frame.width;
          const y = Math.random() * frame.height;
          const r = 1 + Math.random() * 1.5;
          const opacity = 0.1 + Math.random() * 0.6;
          elements.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#999999" fill-opacity="${opacity}"/>`);
          // Add occasional horizontal line artifact
          if (Math.random() < 0.02) {
            const lineWidth = frame.width * (0.1 + Math.random() * 0.4);
            const lineX = Math.random() * frame.width * 0.6;
            elements.push(`<rect x="${lineX}" y="${y - 0.5}" width="${lineWidth}" height="1" fill="#FFFFFF" fill-opacity="0.4"/>`);
          }
        }
        pattern = `<g>${elements.join('\n')}</g>`;
        break;
      }

      case 'SpeckledInk': {
        // Generate SVG for Speckled Ink with varying dot sizes
        const speckles = [];
        const numSpeckles = Math.floor((frame.width * frame.height) / 300); // Further reduced density
        for (let i = 0; i < numSpeckles; i++) {
          const x = Math.random() * frame.width;
          const y = Math.random() * frame.height;
          const r = 1 + Math.random() * 2; // Size variation
          const opacity = 0.2 + Math.random() * 0.7;
          speckles.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#333333" fill-opacity="${opacity}"/>`);
        }
        pattern = `<g>${speckles.join('\n')}</g>`;
        break;
      }

      case 'BlurWaves': {
         // Generate SVG for Blur Waves using feGaussianBlur filter
         const waves = [];
         const numWaves = 5; // Fewer waves for SVG performance
         waves.push(`<defs><filter id="blurFilter"><feGaussianBlur stdDeviation="8" /></filter></defs>`);
         waves.push(`<g filter="url(#blurFilter)">`);
         for (let i = 0; i < numWaves; i++) {
           const waveHeight = frame.height * (0.1 + Math.random() * 0.3);
           const waveWidth = frame.width * (1.5 + Math.random());
           const x = frame.width * (Math.random() - 0.25);
           const y = frame.height * Math.random() - waveHeight / 2;
           const rotation = (Math.random() - 0.5) * 30;
           const opacity = 0.3 + Math.random() * 0.3; // Slightly higher opacity for blur
           const color = `rgba(204, 217, 230, ${opacity})`; // #CCD9E6 with opacity
           waves.push(`<rect x="${x}" y="${y}" width="${waveWidth}" height="${waveHeight}" fill="${color}" transform="rotate(${rotation} ${x + waveWidth/2} ${y + waveHeight/2})" />`);
         }
         waves.push(`</g>`);
         pattern = waves.join('\n');
        break;
      }

      case 'DustFlecks': {
        // Generate SVG for Dust Flecks - very small, sparse dots
        const flecks = [];
        const numFlecks = Math.floor((frame.width * frame.height) / 400); // Further reduced density
        for (let i = 0; i < numFlecks; i++) {
          const x = Math.random() * frame.width;
          const y = Math.random() * frame.height;
          const r = 0.4 + Math.random() * 0.8; // Smaller size
          const opacity = 0.1 + Math.random() * 0.4;
          flecks.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#B3B3B3" fill-opacity="${opacity}"/>`);
        }
        pattern = `<g>${flecks.join('\n')}</g>`;
        break;
      }

      case 'PaperCrinkleLines': {
        // Generate SVG for Paper Crinkle Lines using slightly randomized paths
        const lines = [];
        const numLines = 15;
        for (let i = 0; i < numLines; i++) {
          const numPoints = 5 + Math.floor(Math.random() * 10);
          const startX = Math.random() * frame.width;
          const startY = Math.random() * frame.height;
          const endX = startX + (Math.random() - 0.5) * frame.width * 0.4;
          const endY = startY + (Math.random() - 0.5) * frame.height * 0.4;
          let pathD = `M ${startX} ${startY}`;
          for (let j = 1; j < numPoints; j++) {
            const t = j / (numPoints - 1);
            const currentX = startX + (endX - startX) * t + (Math.random() - 0.5) * 20;
            const currentY = startY + (endY - startY) * t + (Math.random() - 0.5) * 20;
            pathD += ` L ${currentX} ${currentY}`;
          }
          const strokeWidth = 0.4 + Math.random() * 0.6;
          const opacity = 0.3 + Math.random() * 0.4;
          lines.push(`<path d="${pathD}" stroke="#D9D9D9" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
        }
        pattern = `<g>${lines.join('\n')}</g>`;
        break;
      }

      // Motion / Flow
      case 'SwirlVortex': {
        // Generate SVG for Swirl Vortex using spiral paths
        const arms = [];
        const numArms = 3 + Math.floor(Math.random() * 3);
        const centerX = frame.width / 2;
        const centerY = frame.height / 2;
        const maxRadius = Math.min(frame.width, frame.height) * 0.5;

        for (let i = 0; i < numArms; i++) {
          const pointsPerArm = 40;
          const angleOffset = (i / numArms) * Math.PI * 2;
          const twistFactor = 5 + Math.random() * 5;
          let pathD = `M ${centerX} ${centerY}`;
          for (let j = 1; j < pointsPerArm; j++) {
            const radius = (j / pointsPerArm) * maxRadius;
            const angle = angleOffset + (j / pointsPerArm) * twistFactor;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            pathD += ` L ${x} ${y}`;
          }
          const strokeWidth = 0.5 + Math.random() * 1.5;
          const opacity = 0.5 + Math.random() * 0.3;
          arms.push(`<path d="${pathD}" stroke="#CCCCCC" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
        }
        pattern = `<g>${arms.join('\n')}</g>`;
        break;
      }

      case 'TiltedStripes': {
        // Generate SVG for Tilted Stripes using rotated rects
        const stripes = [];
        const numStripes = 25;
        const stripeWidth = 4;
        const stripeLength = Math.max(frame.width, frame.height) * 1.5;
        for (let i = 0; i < numStripes; i++) {
          const centerX = frame.width / 2;
          const centerY = frame.height * ( (i+0.5) / numStripes );
          const x = centerX - stripeLength / 2;
          const y = centerY - stripeWidth / 2;
          const rotation = 30 + (Math.random() - 0.5) * 20; // Base tilt + variation
          stripes.push(`<rect x="${x}" y="${y}" width="${stripeLength}" height="${stripeWidth}" fill="#E0E0E0" transform="rotate(${rotation} ${centerX} ${centerY})"/>`);
        }
        pattern = `<g>${stripes.join('\n')}</g>`;
        break;
      }

      case 'StreamLines': {
        // Generate SVG for Stream Lines using curved paths
        const lines = [];
        const numLines = 12;
        for (let i = 0; i < numLines; i++) {
          const startY = (i / numLines) * frame.height * 1.1 - frame.height * 0.05;
          const endY = startY + (Math.random() - 0.5) * frame.height * 0.4;
          const midX1 = frame.width * (0.2 + Math.random() * 0.2);
          const midY1 = startY + (Math.random() - 0.5) * frame.height * 0.3;
          const midX2 = frame.width * (0.6 + Math.random() * 0.2);
          const midY2 = startY + (Math.random() - 0.5) * frame.height * 0.3;
          const startX = -frame.width * 0.05;
          const endX = frame.width * 1.05;
          const cp1X = startX + (midX1 - startX) * 1.5;
          const cp1Y = startY + (midY1 - startY) * 1.5;
          const cp2X = endX + (midX2 - endX) * 1.5;
          const cp2Y = endY + (midY2 - endY) * 1.5;

          const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
          const strokeWidth = 0.5 + Math.random() * 1;
          const opacity = 0.4 + Math.random() * 0.4;
          lines.push(`<path d="${pathD}" stroke="#CCD9E6" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
        }
        pattern = `<g>${lines.join('\n')}</g>`;
        break;
      }

      case 'SineWaves': {
        // Generate SVG for Sine Waves using path elements
        const waves = [];
        const numWaves = Math.ceil(frame.height / 25);
        const amplitude = 8;
        const frequency = 0.04;

        for (let i = 0; i < numWaves; i++) {
          const yOffset = (i + 0.5) * 25;
          let pathD = `M 0 ${yOffset + Math.sin(0 + i * 0.5) * amplitude}`;
          const pointsPerWave = Math.ceil(frame.width / 8);
          for (let j = 1; j <= pointsPerWave; j++) {
             const x = (j / pointsPerWave) * frame.width;
             const y = yOffset + Math.sin(x * frequency + i * 0.5) * amplitude;
             pathD += ` L ${x} ${y}`;
          }
          waves.push(`<path d="${pathD}" stroke="#D9D9D9" stroke-width="1" fill="none"/>`);
        }
        pattern = `<g>${waves.join('\n')}</g>`;
        break;
      }

      case 'ExpandingCircles': {
        // Generate SVG for Expanding Circles
        const sets = [];
        const numSets = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numSets; i++) {
          const centerX = frame.width * (0.1 + Math.random() * 0.8);
          const centerY = frame.height * (0.1 + Math.random() * 0.8);
          const maxRadius = 30 + Math.random() * 40;
          const numCircles = 5 + Math.floor(Math.random() * 4);
          for (let j = 0; j < numCircles; j++) {
            const radius = ( (j+1) / numCircles ) * maxRadius;
            const strokeWidth = 0.5 + Math.random();
            const opacity = 1 - (j / numCircles) * 0.7; // Fade out
            sets.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="#E5E5E5" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
          }
        }
        pattern = `<g>${sets.join('\n')}</g>`;
        break;
      }

      // ------------------- NEW PATTERNS END (Batch 2) -------------------

      case 'StickyNote': {
        const notes = [];
        const noteSize = 60;
        const spacing = noteSize * 0.8;
        const colors = ["#FDF8B4", "#E0E0E0"]; // Yellowish, Grayish
        for (let row = 0; row * spacing < frame.height + noteSize; row++) {
          for (let col = 0; col * spacing < frame.width + noteSize; col++) {
            const x = col * spacing + (Math.random() - 0.5) * 10 - noteSize / 2;
            const y = row * spacing + (Math.random() - 0.5) * 10 - noteSize / 2;
            const rotation = (Math.random() - 0.5) * 15;
            notes.push(`
              <rect x="${x}" y="${y}" width="${noteSize}" height="${noteSize}" 
                    rx="4" ry="4" 
                    fill="${colors[(row + col) % 2]}" fill-opacity="0.8" 
                    stroke="#B0B0B0" stroke-width="0.5" stroke-opacity="0.5" 
                    transform="rotate(${rotation} ${x + noteSize/2} ${y + noteSize/2})"/>
            `);
          }
        }
        pattern = `<g>${notes.join('\\n')}</g>`;
        break;
      }
      case 'Perlin': {
        // Use feTurbulence for Perlin noise effect - Simplified SVG, rely on fallback
        pattern = `
          <rect width="100%" height="100%" fill="#F0F0F0" />
          <text x="10" y="20" font-size="10" fill="#AAAAAA">Perlin Noise (Fallback)</text>
        `; // Placeholder SVG
        break;
      }
      case 'Marble': {
        // Use turbulence + displacement for marble effect - Simplified SVG, rely on fallback
        pattern = `
          <rect width="100%" height="100%" fill="#E5E5E5" />
          <line x1="10" y1="10" x2="${frame.width - 10}" y2="${frame.height - 10}" stroke="#CCCCCC" stroke-width="2"/>
          <line x1="10" y1="${frame.height - 10}" x2="${frame.width - 10}" y2="10" stroke="#CCCCCC" stroke-width="2"/>
          <text x="10" y="20" font-size="10" fill="#AAAAAA">Marble (Fallback)</text>
        `; // Placeholder SVG
        break;
      }
      case 'Mesh': {
        const meshLines = [];
        const gridSize = 80; // Further increased grid size
        const distortion = 8; // Further reduced distortion

        // Horizontal lines
        for (let y = 0; y <= frame.height; y += gridSize) {
          let pathD = `M 0 ${y + (Math.random() - 0.5) * distortion}`;
          for (let x = gridSize; x <= frame.width; x += gridSize) {
            const currentY = y + (Math.random() - 0.5) * distortion;
            const prevX = x - gridSize;
            const prevY = parseFloat(pathD.substring(pathD.lastIndexOf(' ')+1)); // Risky, assumes last point Y
            const cp1X = prevX + gridSize * 0.3;
            const cp1Y = prevY + (Math.random() - 0.5) * distortion * 0.5;
            const cp2X = x - gridSize * 0.3;
            const cp2Y = currentY + (Math.random() - 0.5) * distortion * 0.5;
            pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${currentY}`;
          }
          meshLines.push(`<path d="${pathD}" stroke="#C8C8C8" stroke-width="0.8" fill="none"/>`);
        }
        // Vertical lines
         for (let x = 0; x <= frame.width; x += gridSize) {
           let pathD = `M ${x + (Math.random() - 0.5) * distortion} 0`;
           for (let y = gridSize; y <= frame.height; y += gridSize) {
             const currentX = x + (Math.random() - 0.5) * distortion;
             const prevY = y - gridSize;
             const prevX = parseFloat(pathD.substring(pathD.lastIndexOf(' ')+1)); // Risky, assumes last point X
             const cp1X = prevX + (Math.random() - 0.5) * distortion * 0.5;
             const cp1Y = prevY + gridSize * 0.3;
             const cp2X = currentX + (Math.random() - 0.5) * distortion * 0.5;
             const cp2Y = y - gridSize * 0.3;
             pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currentX} ${y}`;
           }
           meshLines.push(`<path d="${pathD}" stroke="#C8C8C8" stroke-width="0.8" fill="none"/>`);
         }
        pattern = `<g>${meshLines.join('\\n')}</g>`;
        break;
      }

      default: {
        // Default to grid pattern
        // ... existing code ...
      }
    }
    
    // Create a group for all elements
    if (elements.length > 0) {
      // Create a group for all pattern elements
      const group = figma.group(elements, frame);
      group.name = `${patternType} Pattern (Fallback)`;
      
      figma.notify(`Applied ${patternType} pattern (simplified version)`);
    }
  } catch (error) {
    console.error('Error creating fallback pattern:', error);
    figma.notify('Could not create pattern: ' + error.message);
  }
}

// Helper function to generate SVG pattern string
function generateSVG(patternType, width, height, options = {}) {
  // Define default options (merge with provided options)
  const defaultOptions = { density: 50, size: 50, color: '#E0E0E0', opacity: 0.8 };
  // Use Object.assign for broader compatibility
  const mergedOptions = Object.assign({}, defaultOptions, options);

  const patternColor = mergedOptions.color; // Hex color
  const patternOpacity = mergedOptions.opacity;

  // Define an SVG with a white background
  const svgStart = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  const svgEnd = '</svg>';
  
  // Create a different pattern based on the type
  let pattern = '';
  
  switch (patternType) {
    case 'Grid': { // <-- Added opening brace
      // --- Grid SVG with Options ---
      // Map density (1-100) to spacing (e.g., 100 down to 5)
      const minSpacing = 5;
      const maxSpacing = 100;
      // Ensure gridSize is at least 1
      const gridSize = Math.max(1, mapRange(mergedOptions.density, 1, 100, maxSpacing, minSpacing));

      const minStroke = 0.1; // Ensure stroke non-zero
      const maxStroke = 5;   // Slightly reduced max
       // Ensure stroke is at least minStroke
      const gridStrokeWidth = Math.max(minStroke, mapRange(mergedOptions.size, 1, 100, minStroke, maxStroke));

      pattern = `
        <g stroke="${patternColor}" stroke-width="${gridStrokeWidth}" stroke-opacity="${patternOpacity}">
          ${Array.from({ length: Math.ceil(width/gridSize) -1 }, (_, i) => 
            `<line x1="${(i+1)*gridSize}" y1="0" x2="${(i+1)*gridSize}" y2="${height}"/>`
          ).join('\n')}
          ${Array.from({ length: Math.ceil(height/gridSize) -1 }, (_, i) => 
            `<line x1="0" y1="${(i+1)*gridSize}" x2="${width}" y2="${(i+1)*gridSize}"/>`
          ).join('\n')}
        </g>
      `;
      break;
    } // <-- Added closing brace
      
    case 'Dots': { // <-- Added opening brace
      // --- Dots SVG with Options ---
      // Map density (1-100) to spacing (e.g., 80 down to 5)
      const minSpacing = 5;
      const maxSpacing = 80;
      // Ensure spacing is at least 1
      const dotSpacing = Math.max(1, mapRange(mergedOptions.density, 1, 100, maxSpacing, minSpacing));

      const minRadius = 0.2; // Ensure radius non-zero
      const maxRadius = 15;  // Reduced max radius
      // Ensure radius is at least minRadius
      const dotRadius = Math.max(minRadius, mapRange(mergedOptions.size, 1, 100, minRadius, maxRadius));

      pattern = `
        <g fill="${patternColor}" fill-opacity="${patternOpacity}">
          ${Array.from(
            { length: Math.ceil(width/dotSpacing) * Math.ceil(height/dotSpacing) }, 
            (_, i) => {
              const col = i % Math.ceil(width/dotSpacing);
              const row = Math.floor(i / Math.ceil(width/dotSpacing));
              const x = col * dotSpacing + dotSpacing / 2; // Center dots in spacing
              const y = row * dotSpacing + dotSpacing / 2;
              // Only draw if center is within bounds (approx)
              if (x < width && y < height) { 
                 return `<circle cx="${x}" cy="${y}" r="${dotRadius}"/>`;
              }
              return '';
            }
          ).join('\n')}
        </g>
      `;
      break;
      
    } // <-- Added closing brace
    case 'Circles': { // <-- Added opening brace
      // Direct circles without pattern
      pattern = `
        <g>
          ${Array.from(
            { length: Math.ceil(width/80) * Math.ceil(height/80) }, 
            (_, i) => {
              const x = (i % Math.ceil(width/80)) * 80 + 40;
              const y = Math.floor(i / Math.ceil(width/80)) * 80 + 40;
              return `
                <circle cx="${x}" cy="${y}" r="30" fill="#F0F0F0"/>
                <circle cx="${x}" cy="${y}" r="15" fill="#E8E8E8"/>
              `;
            }
          ).join('')}
        </g>
      `;
      break;
      
    } // <-- Added closing brace
    case 'Waves': { // <-- Added opening brace
      // Direct wave lines
      pattern = `
        <g>
          ${Array.from(
            { length: Math.ceil(height/20) }, 
            (_, i) => {
              const y = i * 20 + 10;
              return `
                <path d="M0 ${y} C ${width*0.2} ${y-10}, ${width*0.3} ${y+10}, ${width*0.5} ${y} C ${width*0.7} ${y-10}, ${width*0.8} ${y+10}, ${width} ${y}" 
                      stroke="#D8D8D8" stroke-width="2" fill="none"/>
                <path d="M0 ${y+5} C ${width*0.2} ${y-5}, ${width*0.3} ${y+15}, ${width*0.5} ${y+5} C ${width*0.7} ${y-5}, ${width*0.8} ${y+15}, ${width} ${y+5}" 
                      stroke="#E8E8E8" stroke-width="1.5" fill="none"/>
              `;
            }
          ).join('')}
        </g>
      `;
      break;
    } // <-- Added closing brace
    case 'Lines': {
       // --- Lines SVG with Options ---
       // Map density (1-100) to spacing (e.g., 50 down to 2)
       const minSpacing = 2;
       const maxSpacing = 50;
       // Ensure spacing is at least 1
       const lineSpacing = Math.max(1, mapRange(mergedOptions.density, 1, 100, maxSpacing, minSpacing));

       const minStroke = 0.1; // Ensure stroke non-zero
       const maxStroke = 10;  // Increased max slightly
       // Ensure stroke is at least minStroke
       const lineStrokeWidth = Math.max(minStroke, mapRange(mergedOptions.size, 1, 100, minStroke, maxStroke));

       const angle = 45; // Keep angle fixed for now
       const radAngle = angle * Math.PI / 180;
       const lineLength = Math.sqrt(width*width + height*height) * 1.5; // Ensure lines cover the area
       const lines = [];
       const step = lineSpacing / Math.sin(radAngle); // Calculate spacing along axis perpendicular to lines

       // Calculate start/end points based on spacing along the perpendicular axis
       for (let i = -Math.ceil(lineLength / step / 2); i < Math.ceil(lineLength / step / 2); i++) {
          const offset = i * step;
          // Center the lines roughly
          const centerX = width / 2 + offset * Math.cos(radAngle + Math.PI/2);
          const centerY = height / 2 + offset * Math.sin(radAngle + Math.PI/2);

          const x1 = centerX - (lineLength / 2) * Math.cos(radAngle);
          const y1 = centerY - (lineLength / 2) * Math.sin(radAngle);
          const x2 = centerX + (lineLength / 2) * Math.cos(radAngle);
          const y2 = centerY + (lineLength / 2) * Math.sin(radAngle);

          lines.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`);
       }

      pattern = `
         <g stroke="${patternColor}" stroke-width="${lineStrokeWidth}" stroke-opacity="${patternOpacity}">
           ${lines.join('\n')}
        </g>
      `;
      break;
    }
    case 'AbstractWaves': { // <-- Added opening brace
      // Create abstract wave patterns
      const waveColor1 = { r: 0.85, g: 0.85, b: 0.85 }; // #D8D8D8
      const waveColor2 = { r: 0.91, g: 0.91, b: 0.91 }; // #E8E8E8
      
      for (let i = 0; i < 6; i++) {
        const wave = figma.createRectangle();
        wave.resize(width * 1.5, 2);
        wave.x = -width / 4;
        wave.y = height * (i * 0.2 + 0.1);
        wave.fills = [{ type: 'SOLID', color: i % 2 === 0 ? waveColor1 : waveColor2 }];
        
        // Create a wavy path by applying varying rotation
        wave.rotation = Math.sin(i * 1.5) * 10;
        
        frame.appendChild(wave);
        wave.name = `Abstract Wave ${i+1}`;
        elements.push(wave);
      }
      break;
    } // <-- Added closing brace
      
    case 'Snow':
      // Create snowflake pattern with crosses and dots
      const snowMarks = [];
      const snowSpacing = 40;
      const crossSize = 4; // Half-size of the cross lines
      const dotRadius = 1.5;

      for (let x = snowSpacing; x < width; x += snowSpacing) {
        for (let y = snowSpacing; y < height; y += snowSpacing) {
          if (Math.round(x / snowSpacing + y / snowSpacing) % 2 === 0) {
            // Simple cross
            snowMarks.push(`
              <line x1="${x - crossSize}" y1="${y}" x2="${x + crossSize}" y2="${y}" stroke="#E5E5E5" stroke-width="1.5"/>
              <line x1="${x}" y1="${y - crossSize}" x2="${x}" y2="${y + crossSize}" stroke="#E5E5E5" stroke-width="1.5"/>
            `);
          } else {
            // Simple dot
            snowMarks.push(`<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="#E5E5E5"/>`);
          }
        }
      }
      pattern = `
        <g>
          ${snowMarks.join('')}
        </g>
      `;
      break;
      
    case 'Stars': { // <-- Added opening brace
      // SVG: Create simple star pattern with asterisk-like shapes
      const starsSVG = [];
      const starSpacingSVG = 50;
      const lineLength = 10;
      const strokeWidth = 1.5;
  
      for (let x = starSpacingSVG; x < width; x += starSpacingSVG) {
        for (let y = starSpacingSVG; y < height; y += starSpacingSVG) {
          // Create 4 lines radiating from the center
          for (let i = 0; i < 4; i++) {
            const angle = i * 45 * (Math.PI / 180); // 0, 45, 90, 135 degrees
            const x1 = x - (lineLength / 2) * Math.cos(angle);
            const y1 = y - (lineLength / 2) * Math.sin(angle);
            const x2 = x + (lineLength / 2) * Math.cos(angle);
            const y2 = y + (lineLength / 2) * Math.sin(angle);
            starsSVG.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E0E0E0" stroke-width="${strokeWidth}"/>`);
          }
        }
      }
      pattern = `<g>${starsSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'Crosses': { // <-- Added opening brace
      // SVG: Create cross pattern with plus signs
      const crossesSVG = [];
      const crossSpacingSVG = 45;
      const crossSize = 12;
      const crossThickness = 2;
  
      for (let x = crossSpacingSVG; x < width; x += crossSpacingSVG) {
        for (let y = crossSpacingSVG; y < height; y += crossSpacingSVG) {
          // Vertical line
          crossesSVG.push(`<rect x="${x - crossThickness / 2}" y="${y - crossSize / 2}" width="${crossThickness}" height="${crossSize}" fill="#D8D8D8"/>`);
          // Horizontal line
          crossesSVG.push(`<rect x="${x - crossSize / 2}" y="${y - crossThickness / 2}" width="${crossSize}" height="${crossThickness}" fill="#D8D8D8"/>`);
        }
      }
      pattern = `<g>${crossesSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'TinyTriangles': { // <-- Added opening brace
      // SVG: Create tiny triangles pattern pointing in different directions
      const trianglesSVG = [];
      const triangleSpacingSVG = 30;
      const triSize = 6; // Size of the triangle base/height
  
      for (let x = triangleSpacingSVG; x < width; x += triangleSpacingSVG) {
        for (let y = triangleSpacingSVG; y < height; y += triangleSpacingSVG) {
          const direction = (Math.floor(x / triangleSpacingSVG) + Math.floor(y / triangleSpacingSVG)) % 4;
          let points = "";
          // Define points based on direction (0: up, 1: right, 2: down, 3: left)
          const halfSize = triSize / 2;
          if (direction === 0) points = `${x},${y-halfSize} ${x-halfSize},${y+halfSize} ${x+halfSize},${y+halfSize}`;
          else if (direction === 1) points = `${x-halfSize},${y-halfSize} ${x+halfSize},${y} ${x-halfSize},${y+halfSize}`;
          else if (direction === 2) points = `${x-halfSize},${y-halfSize} ${x+halfSize},${y-halfSize} ${x},${y+halfSize}`;
          else points = `${x+halfSize},${y-halfSize} ${x+halfSize},${y+halfSize} ${x-halfSize},${y}`;
  
          trianglesSVG.push(`<polygon points="${points}" fill="#E0E0E0"/>`);
        }
      }
      pattern = `<g>${trianglesSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'CircleScatter': { // <-- Added opening brace
      // SVG: Create scattered circles of different sizes
      const circlesSVG = [];
      const colorsSVG = ["#E5E5E5", "#F0F0F0", "#E0E0E0"];
  
      for (let i = 0; i < 50; i++) {
        const x = (((i * 13) % 17) / 17) * width;
        const y = (((i * 19) % 23) / 23) * height;
        const radius = (3 + ((i % 5) * 2)) / 2;
        const color = colorsSVG[i % 3];
        circlesSVG.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}"/>`);
      }
      pattern = `<g>${circlesSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'HexagonGrid': {
      // SVG: Create honeycomb hex grid pattern
      const hexagonsSVG = [];
      const hexSizeSVG = 20;
      const hexWidth = Math.sqrt(3) * hexSizeSVG;
      const hexHeight = 2 * hexSizeSVG;
      const vertSpacing = hexHeight * 3/4;
  
      for (let row = 0; row * vertSpacing < height + hexHeight; row++) {
        for (let col = 0; col * hexWidth < width + hexWidth; col++) {
          const xOffset = (row % 2) * (hexWidth / 2);
          const cx = col * hexWidth + xOffset;
          const cy = row * vertSpacing;
  
          const points = [];
          for (let i = 0; i < 6; i++) {
            const angle_deg = 60 * i - 30;
            const angle_rad = Math.PI / 180 * angle_deg;
            const px = cx + hexSizeSVG * Math.cos(angle_rad);
            const py = cy + hexSizeSVG * Math.sin(angle_rad);
            points.push(`${px},${py}`);
          }
          hexagonsSVG.push(`<polygon points="${points.join(' ')}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
      }
      pattern = `<g>${hexagonsSVG.join('')}</g>`;
      break;
    }
    
    case 'Chevrons': { // <-- Added opening brace
      // SVG: Create chevron pattern (V shapes)
      const chevronsSVG = [];
      const chevronRowSpacing = 30;
      const chevronWidth = 14; // Width of the V
      const chevronHeight = 10; // Height of the V
      const chevronSpacingX = 20;
  
      for (let y = chevronRowSpacing; y < height; y += chevronRowSpacing) {
        for (let x = chevronSpacingX / 2; x < width; x += chevronSpacingX) {
          const points = `${x - chevronWidth / 2},${y + chevronHeight / 2} ${x},${y - chevronHeight / 2} ${x + chevronWidth / 2},${y + chevronHeight / 2}`;
          chevronsSVG.push(`<polyline points="${points}" stroke="#D8D8D8" stroke-width="1.5" fill="none"/>`);
        }
      }
      pattern = `<g>${chevronsSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'SquareTiles': { // <-- Added opening brace
      // SVG: Create square tile pattern
      const squaresSVG = [];
      const tileSizeSVG = 30;
      const tileSpacingSVG = 40;
  
      for (let x = tileSpacingSVG / 2; x < width; x += tileSpacingSVG) {
        for (let y = tileSpacingSVG / 2; y < height; y += tileSpacingSVG) {
          squaresSVG.push(`<rect x="${x - tileSizeSVG / 2}" y="${y - tileSizeSVG / 2}" width="${tileSizeSVG}" height="${tileSizeSVG}" stroke="#E5E5E5" stroke-width="1" fill="none"/>`);
        }
      }
      pattern = `<g>${squaresSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'WaveDots': { // <-- Added opening brace
      // SVG: Create wave dots pattern
      const waveDotsSVG = [];
      const waveHSpacing = 20;
      const waveAmp = 10;
      const waveVSpacing = 30;
      const dotRadius = 2;
  
      for (let row = 0; row * waveVSpacing < height + waveAmp; row++) {
        for (let col = 0; col * waveHSpacing < width; col++) {
          const x = col * waveHSpacing;
          const y = row * waveVSpacing + Math.sin(col * 0.5) * waveAmp;
          if (y > -dotRadius && y < height + dotRadius) { // Only draw if potentially visible
              waveDotsSVG.push(`<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="#E0E0E0"/>`);
          }
        }
      }
      pattern = `<g>${waveDotsSVG.join('')}</g>`;
      break;
    } // <-- Added closing brace
      
    case 'ConcentricCircles': { // <-- Added opening brace
      // Concentric circles pattern
      const concentricCircles = [];
      const ccSpacing = 70;
      
      for (let row = 0; row < Math.ceil(height / ccSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / ccSpacing); col++) {
          const x = col * ccSpacing + ccSpacing/2;
          const y = row * ccSpacing + ccSpacing/2;
          
          // Create 3 concentric circles
          concentricCircles.push(`
            <circle cx="${x}" cy="${y}" r="25" stroke="#E0E0E0" stroke-width="1" fill="none"/>
            <circle cx="${x}" cy="${y}" r="17" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
            <circle cx="${x}" cy="${y}" r="9" stroke="#E0E0E0" stroke-width="0.6" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${concentricCircles.join('')}
        </g>
      `;
      break;
    } // <-- Added closing brace
      
    case 'ThinXMarks':
      // Thin X marks pattern
      const xMarks = [];
      const xmSpacing = 40;
      
      for (let row = 0; row < Math.ceil(height / xmSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / xmSpacing); col++) {
          const x = col * xmSpacing + xmSpacing/2;
          const y = row * xmSpacing + xmSpacing/2;
          const size = 6;
          
          xMarks.push(`
            <line x1="${x-size}" y1="${y-size}" x2="${x+size}" y2="${y+size}" stroke="#E0E0E0" stroke-width="1"/>
            <line x1="${x-size}" y1="${y+size}" x2="${x+size}" y2="${y-size}" stroke="#E0E0E0" stroke-width="1"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${xMarks.join('')}
        </g>
      `;
      break;
      
    case 'OvalGrid':
      // Oval grid pattern
      const ovals = [];
      const ovalSpacing = 50;
      
      for (let row = 0; row < Math.ceil(height / ovalSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / ovalSpacing); col++) {
          const x = col * ovalSpacing + ovalSpacing/2;
          const y = row * ovalSpacing + ovalSpacing/2;
          
          // Alternate horizontal and vertical ovals
          if ((row + col) % 2 === 0) {
            // Horizontal oval
            ovals.push(`
              <ellipse cx="${x}" cy="${y}" rx="15" ry="10" fill="none" stroke="#E0E0E0" stroke-width="1"/>
            `);
          } else {
            // Vertical oval
            ovals.push(`
              <ellipse cx="${x}" cy="${y}" rx="10" ry="15" fill="none" stroke="#E0E0E0" stroke-width="1"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${ovals.join('')}
        </g>
      `;
      break;
      
    case 'AngledLines':
      // Angled lines pattern
      const angledLines = [];
      const alSpacing = 30;
      const lineLength = 20;
      
      for (let row = 0; row < Math.ceil(height / alSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / alSpacing); col++) {
          const x = col * alSpacing + alSpacing/2;
          const y = row * alSpacing + alSpacing/2;
          const variant = (row + col) % 4;
          
          // Create angled lines in 4 different directions
          if (variant === 0) {
            // 45 degrees
            angledLines.push(`
              <line x1="${x-lineLength/2}" y1="${y-lineLength/2}" x2="${x+lineLength/2}" y2="${y+lineLength/2}" 
                    stroke="#E0E0E0" stroke-width="1.2"/>
            `);
          } else if (variant === 1) {
            // 135 degrees
            angledLines.push(`
              <line x1="${x-lineLength/2}" y1="${y+lineLength/2}" x2="${x+lineLength/2}" y2="${y-lineLength/2}" 
                    stroke="#E0E0E0" stroke-width="1.2"/>
            `);
          } else if (variant === 2) {
            // Horizontal
            angledLines.push(`
              <line x1="${x-lineLength/2}" y1="${y}" x2="${x+lineLength/2}" y2="${y}" 
                    stroke="#E0E0E0" stroke-width="1.2"/>
            `);
          } else {
            // Vertical
            angledLines.push(`
              <line x1="${x}" y1="${y-lineLength/2}" x2="${x}" y2="${y+lineLength/2}" 
                    stroke="#E0E0E0" stroke-width="1.2"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${angledLines.join('')}
        </g>
      `;
      break;
      
    case 'SpiralDots':
      // Spiral dots pattern
      const spiralDots = [];
      const spiralSets = Math.ceil((width * height) / (200 * 200));
      
      for (let i = 0; i < spiralSets; i++) {
        // Create center points for each spiral set
        const centerX = (i % Math.ceil(Math.sqrt(spiralSets))) * (width / Math.ceil(Math.sqrt(spiralSets))) + width / (Math.ceil(Math.sqrt(spiralSets)) * 2);
        const centerY = Math.floor(i / Math.ceil(Math.sqrt(spiralSets))) * (height / Math.ceil(Math.sqrt(spiralSets))) + height / (Math.ceil(Math.sqrt(spiralSets)) * 2);
        
        // Create spiral of dots
        for (let j = 0; j < 30; j++) {
          const angle = j * 0.5;
          const radius = j * 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          spiralDots.push(`<circle cx="${x}" cy="${y}" r="${1 + j/20}" fill="#E0E0E0"/>`);
        }
      }
      
      pattern = `
        <g>
          ${spiralDots.join('')}
        </g>
      `;
      break;
      
    case 'DashedLines':
      // Dashed lines pattern
      const dashedLines = [];
      const dlSpacing = 25;
      
      for (let y = dlSpacing/2; y < height; y += dlSpacing) {
        dashedLines.push(`
          <line x1="0" y1="${y}" x2="${width}" y2="${y}" 
                stroke="#E0E0E0" stroke-width="1.2" stroke-dasharray="8 8"/>
        `);
      }
      
      pattern = `
        <g>
          ${dashedLines.join('')}
        </g>
      `;
      break;
      
    case 'ScatteredSquares':
      // Scattered squares pattern
      const scatteredSquares = [];
      
      // Generate 50 squares with deterministic pseudo-random positions and sizes
      for (let i = 0; i < 50; i++) {
        const x = Math.round((((i * 17) % 23) / 23) * width);
        const y = Math.round((((i * 19) % 29) / 29) * height);
        const size = 4 + ((i % 4) * 2);
        
        scatteredSquares.push(`
          <rect x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}" 
                fill="none" stroke="#E0E0E0" stroke-width="1"/>
        `);
      }
      
      pattern = `
        <g>
          ${scatteredSquares.join('')}
        </g>
      `;
      break;
      
    case 'TinyMoons':
      // Tiny moons (crescents) pattern
      const moons = [];
      const moonSpacing = 40;
      
      for (let row = 0; row < Math.ceil(height / moonSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / moonSpacing); col++) {
          const x = col * moonSpacing + moonSpacing/2;
          const y = row * moonSpacing + moonSpacing/2;
          
          // Rotate the moon based on position
          const rotation = ((row + col) % 4) * 90;
          
          moons.push(`
            <g transform="translate(${x}, ${y}) rotate(${rotation})">
              <circle cx="0" cy="0" r="9" fill="#E8E8E8"/>
              <circle cx="4" cy="0" r="8" fill="white"/>
            </g>
          `);
        }
      }
      
      pattern = `
        <g>
          ${moons.join('')}
        </g>
      `;
      break;
      
    case 'Arrowheads':
      // Arrowheads pattern
      const arrowheads = [];
      const arrowSpacing = 35;
      
      for (let row = 0; row < Math.ceil(height / arrowSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / arrowSpacing); col++) {
          const x = col * arrowSpacing + arrowSpacing/2;
          const y = row * arrowSpacing + arrowSpacing/2;
          
          // Rotate arrow based on position
          const variant = (row + col) % 4;
          let transform = '';
          
          if (variant === 0) {
            // Point right
            transform = '';
          } else if (variant === 1) {
            // Point down
            transform = 'rotate(90)';
          } else if (variant === 2) {
            // Point left
            transform = 'rotate(180)';
          } else {
            // Point up
            transform = 'rotate(270)';
          }
          
          arrowheads.push(`
            <g transform="translate(${x}, ${y}) ${transform}">
              <polygon points="0,0 8,4 0,8" fill="#E0E0E0"/>
            </g>
          `);
        }
      }
      
      pattern = `
        <g>
          ${arrowheads.join('')}
        </g>
      `;
      break;
      
    case 'BlockDots':
      // Block dots (square dots) pattern
      const blockDots = [];
      const bdSpacing = 30;
      
      for (let row = 0; row < Math.ceil(height / bdSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / bdSpacing); col++) {
          const x = col * bdSpacing + bdSpacing/2;
          const y = row * bdSpacing + bdSpacing/2;
          
          blockDots.push(`
            <rect x="${x-3}" y="${y-3}" width="6" height="6" fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${blockDots.join('')}
        </g>
      `;
      break;
      
    case 'ThinBars':
      // Thin bars pattern (like morse code)
      const thinBars = [];
      const barSpacing = 30;
      const barWidth = 12;
      const barHeight = 2;
      
      for (let row = 0; row < Math.ceil(height / barSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / barSpacing); col++) {
          const x = col * barSpacing + barSpacing/2;
          const y = row * barSpacing + barSpacing/2;
          
          // Alternate horizontal and vertical bars
          const variant = (row + col) % 2;
          
          if (variant === 0) {
            // Horizontal bar
            thinBars.push(`
              <rect x="${x-barWidth/2}" y="${y-barHeight/2}" width="${barWidth}" height="${barHeight}" fill="#E0E0E0"/>
            `);
          } else {
            // Vertical bar
            thinBars.push(`
              <rect x="${x-barHeight/2}" y="${y-barWidth/2}" width="${barHeight}" height="${barWidth}" fill="#E0E0E0"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${thinBars.join('')}
        </g>
      `;
      break;
      
    case 'CirclesOnSticks':
      // Circles on sticks pattern (lollipop-like)
      const circlesOnSticks = [];
      const cosSpacing = 35;
      
      for (let row = 0; row < Math.ceil(height / cosSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / cosSpacing); col++) {
          const x = col * cosSpacing + cosSpacing/2;
          const y = row * cosSpacing + cosSpacing/2;
          
          // Create circle with stick
          circlesOnSticks.push(`
            <circle cx="${x}" cy="${y-6}" r="5" fill="#E0E0E0"/>
            <line x1="${x}" y1="${y}" x2="${x}" y2="${y+8}" stroke="#D8D8D8" stroke-width="2"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${circlesOnSticks.join('')}
        </g>
      `;
      break;
      
    case 'NestedTriangles':
      // Nested triangles pattern
      const nestedTriangles = [];
      const ntSpacing = 40;
      
      for (let row = 0; row < Math.ceil(height / ntSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / ntSpacing); col++) {
          const x = col * ntSpacing + ntSpacing/2;
          const y = row * ntSpacing + ntSpacing/2;
          
          // Create nested triangles
          nestedTriangles.push(`
            <polygon points="${x},${y-12} ${x-10},${y+6} ${x+10},${y+6}" 
                     stroke="#E0E0E0" stroke-width="1" fill="none"/>
            <polygon points="${x},${y-6} ${x-5},${y+3} ${x+5},${y+3}" 
                     stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${nestedTriangles.join('')}
        </g>
      `;
      break;
      
    case 'DotRingCombo':
      // Dot and ring combo pattern
      const dotRingCombo = [];
      const drcSpacing = 35;
      
      for (let row = 0; row < Math.ceil(height / drcSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / drcSpacing); col++) {
          const x = col * drcSpacing + drcSpacing/2;
          const y = row * drcSpacing + drcSpacing/2;
          
          // Create dot with surrounding ring
          dotRingCombo.push(`
            <circle cx="${x}" cy="${y}" r="8" stroke="#E0E0E0" stroke-width="1" fill="none"/>
            <circle cx="${x}" cy="${y}" r="3" fill="#D8D8D8"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${dotRingCombo.join('')}
        </g>
      `;
      break;
      
    case 'ArchRows':
      // Arch rows pattern
      const archRows = [];
      const archRowHeight = 25;
      const archWidth = 20;
      
      for (let y = archRowHeight; y < height; y += archRowHeight) {
        for (let x = archWidth/2; x < width; x += archWidth) {
          // Create U-shaped arches in rows
          archRows.push(`
            <path d="M ${x-archWidth/2} ${y} Q ${x} ${y-15} ${x+archWidth/2} ${y}" 
                  stroke="#E0E0E0" stroke-width="1" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${archRows.join('')}
        </g>
      `;
      break;
      
    case 'CircleSlices':
      // Circle slices pattern (Pac-Man-like)
      const circleSlices = [];
      const sliceSpacing = 40;
      const sliceRadius = 12;
      
      for (let row = 0; row < Math.ceil(height / sliceSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / sliceSpacing); col++) {
          const x = col * sliceSpacing + sliceSpacing/2;
          const y = row * sliceSpacing + sliceSpacing/2;
          
          // Create quarter circle in different orientations
          const variant = (row + col) % 4;
          const startAngle = variant * 90; // 0, 90, 180, or 270 degrees
          const endAngle = startAngle + 270; // Draw 3/4 of a circle (leaving 1/4 open)
          
          const startRad = startAngle * Math.PI / 180;
          const endRad = endAngle * Math.PI / 180;
          
          // Create the arc path
          const largeArcFlag = 1; // 270 degrees is > 180
          const startX = x + sliceRadius * Math.cos(startRad);
          const startY = y + sliceRadius * Math.sin(startRad);
          const endX = x + sliceRadius * Math.cos(endRad);
          const endY = y + sliceRadius * Math.sin(endRad);
          
          circleSlices.push(`
            <path d="M ${x} ${y} L ${startX} ${startY} A ${sliceRadius} ${sliceRadius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z" 
                  fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${circleSlices.join('')}
        </g>
      `;
      break;
      
    case 'DotsInCircle':
      // Dots in circle pattern
      const dotsInCircle = [];
      const dicSpacing = 45;
      const dicOuterRadius = 15;
      const dicDotRadius = 2;
      
      for (let row = 0; row < Math.ceil(height / dicSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / dicSpacing); col++) {
          const x = col * dicSpacing + dicSpacing/2;
          const y = row * dicSpacing + dicSpacing/2;
          
          // Create circle
          dotsInCircle.push(`<circle cx="${x}" cy="${y}" r="${dicOuterRadius}" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
          
          // Add dots around the circle
          const dotCount = 8;
          for (let i = 0; i < dotCount; i++) {
            const angle = (i / dotCount) * Math.PI * 2;
            const dotX = x + Math.cos(angle) * dicOuterRadius * 0.7;
            const dotY = y + Math.sin(angle) * dicOuterRadius * 0.7;
            
            dotsInCircle.push(`<circle cx="${dotX}" cy="${dotY}" r="${dicDotRadius}" fill="#E0E0E0"/>`);
          }
        }
      }
      
      pattern = `
        <g>
          ${dotsInCircle.join('')}
        </g>
      `;
      break;
      
    case 'HalfCircles':
      // Half circles pattern
      const halfCircles = [];
      const hcSpacing = 35;
      const hcRadius = 10;
      
      for (let row = 0; row < Math.ceil(height / hcSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / hcSpacing); col++) {
          const x = col * hcSpacing + hcSpacing/2;
          const y = row * hcSpacing + hcSpacing/2;
          
          // Create semi-circles in alternating orientations
          const variant = (row + col) % 4;
          let path;
          
          if (variant === 0) {
            // Top half
            path = `M ${x-hcRadius} ${y} A ${hcRadius} ${hcRadius} 0 0 1 ${x+hcRadius} ${y} Z`;
          } else if (variant === 1) {
            // Right half
            path = `M ${x} ${y-hcRadius} A ${hcRadius} ${hcRadius} 0 0 1 ${x} ${y+hcRadius} Z`;
          } else if (variant === 2) {
            // Bottom half
            path = `M ${x-hcRadius} ${y} A ${hcRadius} ${hcRadius} 0 0 0 ${x+hcRadius} ${y} Z`;
          } else {
            // Left half
            path = `M ${x} ${y-hcRadius} A ${hcRadius} ${hcRadius} 0 0 0 ${x} ${y+hcRadius} Z`;
          }
          
          halfCircles.push(`<path d="${path}" fill="#E0E0E0" opacity="0.8"/>`);
        }
      }
      
      pattern = `
        <g>
          ${halfCircles.join('')}
        </g>
      `;
      break;
      
    case 'DiamondGrid':
      // Diamond grid pattern (rotated squares)
      const diamondGrid = [];
      const dgSpacing = 35;
      const diamondSize = 12;
      
      for (let row = 0; row < Math.ceil(height / dgSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / dgSpacing); col++) {
          const x = col * dgSpacing + dgSpacing/2;
          const y = row * dgSpacing + dgSpacing/2;
          
          // Create diamond (rotated square)
          diamondGrid.push(`
            <rect x="${x-diamondSize/2}" y="${y-diamondSize/2}" 
                  width="${diamondSize}" height="${diamondSize}" 
                  transform="rotate(45 ${x} ${y})"
                  stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${diamondGrid.join('')}
        </g>
      `;
      break;
      
    case 'ThinRings':
      // Thin rings pattern
      const thinRings = [];
      const ringSpacing = 40;
      
      for (let row = 0; row < Math.ceil(height / ringSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / ringSpacing); col++) {
          const x = col * ringSpacing + ringSpacing/2;
          const y = row * ringSpacing + ringSpacing/2;
          
          // Create thin circle
          thinRings.push(`<circle cx="${x}" cy="${y}" r="10" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
        }
      }
      
      pattern = `
        <g>
          ${thinRings.join('')}
        </g>
      `;
      break;
      
    case 'ZigzagLines':
      // Zigzag lines pattern
      const zigzagLines = [];
      const zigzagSpacing = 25;
      const zigzagWidth = 15;
      const zigzagHeight = 8;
      
      for (let y = zigzagSpacing; y < height; y += zigzagSpacing) {
        // Create horizontal zigzag lines
        let pathD = `M 0 ${y}`;
        
        for (let x = 0; x < width + zigzagWidth; x += zigzagWidth) {
          const yUp = y - zigzagHeight/2;
          const yDown = y + zigzagHeight/2;
          
          pathD += ` L ${x + zigzagWidth/2} ${yUp} L ${x + zigzagWidth} ${y}`;
        }
        
        zigzagLines.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
      }
      
      pattern = `
        <g>
          ${zigzagLines.join('')}
        </g>
      `;
      break;
      
    case 'NestedSquares':
      // Nested squares pattern
      const nestedSquares = [];
      const nsSpacing = 45;
      
      for (let row = 0; row < Math.ceil(height / nsSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / nsSpacing); col++) {
          const x = col * nsSpacing + nsSpacing/2;
          const y = row * nsSpacing + nsSpacing/2;
          
          // Create nested squares
          nestedSquares.push(`
            <rect x="${x-12}" y="${y-12}" width="24" height="24" 
                  stroke="#E0E0E0" stroke-width="0.8" fill="none"/>
            <rect x="${x-6}" y="${y-6}" width="12" height="12" 
                  stroke="#E0E0E0" stroke-width="0.6" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${nestedSquares.join('')}
        </g>
      `;
      break;
      
    case 'CornerBrackets':
      // Corner brackets pattern
      const cornerBrackets = [];
      const cbSpacing = 35;
      const bracketSize = 10;
      
      for (let row = 0; row < Math.ceil(height / cbSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / cbSpacing); col++) {
          const x = col * cbSpacing + cbSpacing/2;
          const y = row * cbSpacing + cbSpacing/2;
          
          // Create L-shaped brackets in 4 corners
          const variant = (row + col) % 4;
          
          if (variant === 0) {
            // Top-left corner
            cornerBrackets.push(`
              <polyline points="${x-bracketSize},${y-bracketSize/2} ${x-bracketSize},${y-bracketSize} ${x-bracketSize/2},${y-bracketSize}" 
                        stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
            `);
          } else if (variant === 1) {
            // Top-right corner
            cornerBrackets.push(`
              <polyline points="${x+bracketSize},${y-bracketSize/2} ${x+bracketSize},${y-bracketSize} ${x+bracketSize/2},${y-bracketSize}" 
                        stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
            `);
          } else if (variant === 2) {
            // Bottom-right corner
            cornerBrackets.push(`
              <polyline points="${x+bracketSize},${y+bracketSize/2} ${x+bracketSize},${y+bracketSize} ${x+bracketSize/2},${y+bracketSize}" 
                        stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
            `);
          } else {
            // Bottom-left corner
            cornerBrackets.push(`
              <polyline points="${x-bracketSize},${y+bracketSize/2} ${x-bracketSize},${y+bracketSize} ${x-bracketSize/2},${y+bracketSize}" 
                        stroke="#D8D8D8" stroke-width="1.2" fill="none"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${cornerBrackets.join('')}
        </g>
      `;
      break;
      
    case 'TinyHearts':
      // Tiny hearts pattern
      const tinyHearts = [];
      const heartSpacing = 40;
      const heartSize = 6;
      
      for (let row = 0; row < Math.ceil(height / heartSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / heartSpacing); col++) {
          const x = col * heartSpacing + heartSpacing/2;
          const y = row * heartSpacing + heartSpacing/2;
          
          // Create heart shape
          const topY = y - heartSize * 0.4;
          const bottomY = y + heartSize * 0.6;
          const leftX = x - heartSize;
          const rightX = x + heartSize;
          const curveX1 = x - heartSize * 0.5;
          const curveX2 = x + heartSize * 0.5;
          const curveY = y - heartSize * 0.8;
          
          tinyHearts.push(`
            <path d="M ${x} ${bottomY} 
                     C ${leftX} ${topY} ${curveX1} ${curveY} ${x} ${topY} 
                     C ${curveX2} ${curveY} ${rightX} ${topY} ${x} ${bottomY} Z" 
                   fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${tinyHearts.join('')}
        </g>
      `;
      break;
      
    case 'DotDashCombo':
      // Dot and dash combo pattern (like morse code)
      const dotDashCombo = [];
      const ddcSpacing = 25;
      const dashWidth = 10;
      const dashHeight = 2;
      const ddcDotRadius = 2;
      
      for (let row = 0; row < Math.ceil(height / ddcSpacing); row++) {
        // Create horizontal lines of dot-dash patterns
        let xPos = dashWidth;
        while (xPos < width) {
          // Add a dot
          dotDashCombo.push(`<circle cx="${xPos}" cy="${row * ddcSpacing + ddcSpacing/2}" r="${ddcDotRadius}" fill="#E0E0E0"/>`);
          xPos += dashWidth;
          
          // Skip if we're out of space
          if (xPos >= width) break;
          
          // Add a dash
          dotDashCombo.push(`
            <rect x="${xPos-dashWidth/2}" y="${row * ddcSpacing + ddcSpacing/2 - dashHeight/2}" 
                  width="${dashWidth}" height="${dashHeight}" fill="#E0E0E0"/>
          `);
          xPos += dashWidth * 1.5;
        }
      }
      
      pattern = `
        <g>
          ${dotDashCombo.join('')}
        </g>
      `;
      break;
      
    case 'TinyRectangles':
      // Tiny rectangles pattern - similar to dots but elongated
      const tinyRects = [];
      const tinyRectsTrSpacing = 15; // Renamed from trSpacing
      const rectWidth = 5;
      const rectHeight = 2;
      
      for (let row = 0; row < Math.ceil(height / tinyRectsTrSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / tinyRectsTrSpacing); col++) {
          const x = col * tinyRectsTrSpacing + tinyRectsTrSpacing/2;
          const y = row * tinyRectsTrSpacing + tinyRectsTrSpacing/2;
          
          // Alternate horizontal and vertical orientation
          const isHorizontal = (row + col) % 2 === 0;
          
          if (isHorizontal) {
            tinyRects.push(`
              <rect x="${x-rectWidth/2}" y="${y-rectHeight/2}" width="${rectWidth}" height="${rectHeight}" fill="#E0E0E0"/>
            `);
          } else {
            tinyRects.push(`
              <rect x="${x-rectHeight/2}" y="${y-rectWidth/2}" width="${rectHeight}" height="${rectWidth}" fill="#E0E0E0"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${tinyRects.join('')}
        </g>
      `;
      break;
      
    case 'OffsetGrid':
      // Offset grid pattern - regular grid with every other row shifted
      const offsetGrid = [];
      const ogSpacing = 25;
      
      for (let row = 0; row < Math.ceil(height / ogSpacing) + 1; row++) {
        const isOffsetRow = row % 2 === 1;
        const offset = isOffsetRow ? ogSpacing / 2 : 0;
        
        // Horizontal lines
        offsetGrid.push(`
          <line x1="0" y1="${row * ogSpacing}" x2="${width}" y2="${row * ogSpacing}" 
                stroke="#DADADA" stroke-width="1"/>
        `);
        
        // Vertical lines with offset for odd rows
        for (let col = 0; col < Math.ceil(width / ogSpacing) + 1; col++) {
          const x = col * ogSpacing + offset;
          if (x <= width) {
            offsetGrid.push(`
              <line x1="${x}" y1="${row * ogSpacing}" x2="${x}" y2="${(row+1) * ogSpacing}" 
                    stroke="#DADADA" stroke-width="1"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${offsetGrid.join('')}
        </g>
      `;
      break;
      
    case 'BeanShapes':
      // Bean shapes pattern - soft oval blobs
      const beanShapes = [];
      const bsSpacing = 35;
      
      for (let row = 0; row < Math.ceil(height / bsSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / bsSpacing); col++) {
          const x = col * bsSpacing + bsSpacing/2;
          const y = row * bsSpacing + bsSpacing/2;
          
          // Rotate beans in different directions
          const rotation = ((row + col) % 4) * 90;
          
          beanShapes.push(`
            <g transform="translate(${x}, ${y}) rotate(${rotation})">
              <path d="M -8,0 C -8,-6 -3,-10 2,-8 C 7,-6 10,0 8,4 C 6,8 0,8 -4,6 C -8,4 -8,0 -8,0 Z" 
                    fill="#E0E0E0"/>
            </g>
          `);
        }
      }
      
      pattern = `
        <g>
          ${beanShapes.join('')}
        </g>
      `;
      break;
      
    case 'CornerDots':
      // Corner dots pattern - dots in corners of invisible squares
      const cornerDots = [];
      const cdSpacing = 25;
      const cdRadius = 2;
      
      for (let row = 0; row < Math.ceil(height / cdSpacing) + 1; row++) {
        for (let col = 0; col < Math.ceil(width / cdSpacing) + 1; col++) {
          const x = col * cdSpacing;
          const y = row * cdSpacing;
          
          cornerDots.push(`<circle cx="${x}" cy="${y}" r="${cdRadius}" fill="#E0E0E0"/>`);
        }
      }
      
      pattern = `
        <g>
          ${cornerDots.join('')}
        </g>
      `;
      break;
      
    case 'TriangleStack':
      // Triangle stack pattern - layered upward triangles
      const triangleStack = [];
      const tsSpacing = 40;
      
      for (let row = 0; row < Math.ceil(height / tsSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / tsSpacing); col++) {
          const x = col * tsSpacing + tsSpacing/2;
          const y = row * tsSpacing + tsSpacing/2;
          
          // Create three stacked triangles of different sizes
          triangleStack.push(`
            <polygon points="${x},${y-12} ${x-10},${y+6} ${x+10},${y+6}" 
                     fill="#F0F0F0" stroke="#E0E0E0" stroke-width="0.5"/>
            <polygon points="${x},${y-8} ${x-7},${y+4} ${x+7},${y+4}" 
                     fill="#E8E8E8" stroke="#E0E0E0" stroke-width="0.5"/>
            <polygon points="${x},${y-4} ${x-4},${y+2} ${x+4},${y+2}" 
                     fill="#E0E0E0" stroke="#E0E0E0" stroke-width="0.5"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${triangleStack.join('')}
        </g>
      `;
      break;
      
    case 'HalfDiamonds':
      // Half diamonds pattern
      const halfDiamonds = [];
      const hdSpacing = 30;
      const hdSize = 12;
      
      for (let row = 0; row < Math.ceil(height / hdSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / hdSpacing); col++) {
          const x = col * hdSpacing + hdSpacing/2;
          const y = row * hdSpacing + hdSpacing/2;
          
          // Alternate between top and bottom halves
          const variant = (row + col) % 2;
          
          if (variant === 0) {
            // Top half
            halfDiamonds.push(`
              <path d="M ${x} ${y-hdSize/2} L ${x+hdSize/2} ${y} L ${x} ${y+hdSize/2} L ${x-hdSize/2} ${y} Z" 
                    fill="#E0E0E0" clip-path="polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)"/>
            `);
          } else {
            // Bottom half
            halfDiamonds.push(`
              <path d="M ${x} ${y-hdSize/2} L ${x+hdSize/2} ${y} L ${x} ${y+hdSize/2} L ${x-hdSize/2} ${y} Z" 
                    fill="#E0E0E0" clip-path="polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${halfDiamonds.join('')}
        </g>
      `;
      break;
      
    case 'RoundedSquares':
      // Rounded squares pattern
      const roundedSquares = [];
      const rsSpacing = 35;
      const rsSize = 14;
      const rsRadius = 3;
      
      for (let row = 0; row < Math.ceil(height / rsSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / rsSpacing); col++) {
          const x = col * rsSpacing + rsSpacing/2;
          const y = row * rsSpacing + rsSpacing/2;
          
          roundedSquares.push(`
            <rect x="${x-rsSize/2}" y="${y-rsSize/2}" width="${rsSize}" height="${rsSize}" 
                  rx="${rsRadius}" ry="${rsRadius}" 
                  stroke="#E0E0E0" stroke-width="1" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${roundedSquares.join('')}
        </g>
      `;
      break;
      
    case 'PetalShapes':
      // Petal shapes pattern - simple flower petals
      const petalShapes = [];
      const psSpacing = 40;
      const petalRadius = 8;
      
      for (let row = 0; row < Math.ceil(height / psSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / psSpacing); col++) {
          const x = col * psSpacing + psSpacing/2;
          const y = row * psSpacing + psSpacing/2;
          
          // Create 4-petal flower shape
          petalShapes.push(`
            <path d="M ${x} ${y-petalRadius} Q ${x+petalRadius*0.7} ${y-petalRadius*0.7} ${x+petalRadius} ${y} Q ${x+petalRadius*0.7} ${y+petalRadius*0.7} ${x} ${y+petalRadius} Q ${x-petalRadius*0.7} ${y+petalRadius*0.7} ${x-petalRadius} ${y} Q ${x-petalRadius*0.7} ${y-petalRadius*0.7} ${x} ${y-petalRadius} Z" 
                      fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${petalShapes.join('')}
        </g>
      `;
      break;
      
    case 'AngledChevrons':
      // Angled chevrons pattern - V shapes tilted
      const angledChevrons = [];
      const acSpacing = 30;
      const acSize = 8;
      
      for (let row = 0; row < Math.ceil(height / acSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / acSpacing); col++) {
          const x = col * acSpacing + acSpacing/2;
          const y = row * acSpacing + acSpacing/2;
          
          // Alternate between left-tilted and right-tilted chevrons
          const tiltRight = (row + col) % 2 === 0;
          const rotate = tiltRight ? 15 : -15;
          
          angledChevrons.push(`
            <g transform="translate(${x}, ${y}) rotate(${rotate})">
              <polyline points="${-acSize},${-acSize/2} 0,${acSize/2} ${acSize},${-acSize/2}" 
                        stroke="#E0E0E0" stroke-width="1.5" fill="none"/>
            </g>
          `);
        }
      }
      
      pattern = `
        <g>
          ${angledChevrons.join('')}
        </g>
      `;
      break;
      
    case 'EllipseLines':
      // Ellipse lines pattern - skinny stretched ovals
      const ellipseLines = [];
      const elSpacing = 30;
      const elWidth = 15;
      const elHeight = 4;
      
      for (let row = 0; row < Math.ceil(height / elSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / elSpacing); col++) {
          const x = col * elSpacing + elSpacing/2;
          const y = row * elSpacing + elSpacing/2;
          
          // Alternate horizontal and vertical orientations
          const isHorizontal = (row + col) % 2 === 0;
          
          if (isHorizontal) {
            ellipseLines.push(`
              <ellipse cx="${x}" cy="${y}" rx="${elWidth/2}" ry="${elHeight/2}" fill="#E0E0E0"/>
            `);
          } else {
            ellipseLines.push(`
              <ellipse cx="${x}" cy="${y}" rx="${elHeight/2}" ry="${elWidth/2}" fill="#E0E0E0"/>
            `);
          }
        }
      }
      
      pattern = `
        <g>
          ${ellipseLines.join('')}
        </g>
      `;
      break;
      
    case 'DashedCircles':
      // Dashed circles pattern
      const dashedCircles = [];
      const dcSpacing = 45;
      const dcRadius = 12;
      
      for (let row = 0; row < Math.ceil(height / dcSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / dcSpacing); col++) {
          const x = col * dcSpacing + dcSpacing/2;
          const y = row * dcSpacing + dcSpacing/2;
          
          dashedCircles.push(`
            <circle cx="${x}" cy="${y}" r="${dcRadius}" 
                    stroke="#E0E0E0" stroke-width="1" stroke-dasharray="3,3" fill="none"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${dashedCircles.join('')}
        </g>
      `;
      break;
      
    case 'TornPaperEdge':
      // Torn paper edge pattern - jagged repeating line
      const tornEdges = [];
      const teSpacing = 25;
      const teHeight = 10;
      
      for (let y = teSpacing; y < height; y += teSpacing) {
        // Create a jagged path
        let pathD = `M 0 ${y}`;
        
        for (let x = 0; x < width; x += 15) {
          const yOffset = Math.sin(x * 0.2) * (teHeight/2);
          const midX = x + 7.5;
          pathD += ` L ${midX} ${y + yOffset} L ${x + 15} ${y}`;
        }
        
        tornEdges.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
      }
      
      pattern = `
        <g>
          ${tornEdges.join('')}
        </g>
      `;
      break;
      
    case 'SpiralLoops':
      // Spiral loops pattern - tiny curly coils
      const spiralLoops = [];
      const slSpacing = 35;
      
      for (let row = 0; row < Math.ceil(height / slSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / slSpacing); col++) {
          const x = col * slSpacing + slSpacing/2;
          const y = row * slSpacing + slSpacing/2;
          
          // Create a spiral path with 3 loops
          let pathD = `M ${x+6} ${y}`;
          
          for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
            const radius = 6 * (1 - angle / (Math.PI * 6));
            const px = x + radius * Math.cos(angle);
            const py = y + radius * Math.sin(angle);
            pathD += ` L ${px} ${py}`;
          }
          
          spiralLoops.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
      }
      
      pattern = `
        <g>
          ${spiralLoops.join('')}
        </g>
      `;
      break;
      
    case 'ArrowRepeat':
      // Arrow repeat pattern - simple arrowheads all pointing same way
      const arrowRepeat = [];
      const arSpacing = 30;
      const arSize = 8;
      
      for (let row = 0; row < Math.ceil(height / arSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / arSpacing); col++) {
          const x = col * arSpacing + arSpacing/2;
          const y = row * arSpacing + arSpacing/2;
          
          // All arrows point right
          arrowRepeat.push(`
            <polygon points="${x-arSize/2},${y-arSize/2} ${x+arSize/2},${y} ${x-arSize/2},${y+arSize/2}" 
                     fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${arrowRepeat.join('')}
        </g>
      `;
      break;
      
    case 'CornerCutShapes':
      // Corner cut shapes - squares with a corner snipped off
      const cornerCutShapes = [];
      const ccsSpacing = 35;
      const ccsSize = 16;
      
      for (let row = 0; row < Math.ceil(height / ccsSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / ccsSpacing); col++) {
          const x = col * ccsSpacing + ccsSpacing/2;
          const y = row * ccsSpacing + ccsSpacing/2;
          
          // Rotate the cut to different corners based on position
          const cornerToCut = (row + col) % 4;
          let pathD;
          
          if (cornerToCut === 0) {
            // Top-left corner cut
            pathD = `M ${x-ccsSize/3} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y-ccsSize/3} Z`;
          } else if (cornerToCut === 1) {
            // Top-right corner cut
            pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/3} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/3} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} Z`;
          } else if (cornerToCut === 2) {
            // Bottom-right corner cut
            pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/3} L ${x+ccsSize/3} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/2} Z`;
          } else {
            // Bottom-left corner cut
            pathD = `M ${x-ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y-ccsSize/2} L ${x+ccsSize/2} ${y+ccsSize/2} L ${x-ccsSize/3} ${y+ccsSize/2} L ${x-ccsSize/2} ${y+ccsSize/3} Z`;
          }
          
          cornerCutShapes.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        }
      }
      
      pattern = `
        <g>
          ${cornerCutShapes.join('')}
        </g>
      `;
      break;
      
    case 'StepPattern':
      // Step pattern - stairs going up and down in a wave
      const stepPattern = [];
      const spSpacing = 20;
      const spHeight = 15;
      
      for (let y = spSpacing; y < height; y += spHeight * 2) {
        // Create a step path going across
        let pathD = `M 0 ${y}`;
        
        let currentY = y;
        for (let x = 0; x < width; x += spSpacing) {
          if (x % (spSpacing * 2) === 0) {
            // Step up
            pathD += ` L ${x} ${currentY} L ${x} ${currentY - spHeight} `;
            currentY -= spHeight;
          } else {
            // Step down
            pathD += ` L ${x} ${currentY} L ${x} ${currentY + spHeight} `;
            currentY += spHeight;
          }
        }
        
        // Finish the path
        pathD += ` L ${width} ${currentY}`;
        
        stepPattern.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
      }
      
      pattern = `
        <g>
          ${stepPattern.join('')}
        </g>
      `;
      break;
      
    case 'RippleDots':
      // Ripple dots pattern - small dot inside a ring
      const rippleDots = [];
      const rdSpacing = 30;
      const rdOuterRadius = 8;
      const rdInnerRadius = 2;
      
      for (let row = 0; row < Math.ceil(height / rdSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / rdSpacing); col++) {
          const x = col * rdSpacing + rdSpacing/2;
          const y = row * rdSpacing + rdSpacing/2;
          
          rippleDots.push(`
            <circle cx="${x}" cy="${y}" r="${rdOuterRadius}" stroke="#E0E0E0" stroke-width="1" fill="none"/>
            <circle cx="${x}" cy="${y}" r="${rdInnerRadius}" fill="#E0E0E0"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${rippleDots.join('')}
        </g>
      `;
      break;
      
    case 'HexRing':
      // Hex ring pattern - hexagon outlines with smaller hex inside
      const hexRing = [];
      const hrSpacing = 40;
      const outerSize = 15;
      const innerSize = 8;
      
      for (let row = 0; row < Math.ceil(height / hrSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / hrSpacing); col++) {
          const x = col * hrSpacing + (row % 2 ? hrSpacing/2 : 0) + hrSpacing/2;
          const y = row * hrSpacing + hrSpacing/2;
          
          // Generate points for outer hexagon
          const outerPoints = [];
          const innerPoints = [];
          
          for (let i = 0; i < 6; i++) {
            const angle = (60 * i - 30) * Math.PI / 180;
            outerPoints.push(`${x + outerSize * Math.cos(angle)},${y + outerSize * Math.sin(angle)}`);
            innerPoints.push(`${x + innerSize * Math.cos(angle)},${y + innerSize * Math.sin(angle)}`);
          }
          
          hexRing.push(`
            <polygon points="${outerPoints.join(' ')}" fill="none" stroke="#E0E0E0" stroke-width="1"/>
            <polygon points="${innerPoints.join(' ')}" fill="none" stroke="#E0E0E0" stroke-width="0.8"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${hexRing.join('')}
        </g>
      `;
      break;
      
    case 'FlowerGrid':
      // Flower grid pattern - simple 4-petal flowers
      const flowerGrid = [];
      const fgSpacing = 35;
      const petalSize = 6;
      
      for (let row = 0; row < Math.ceil(height / fgSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / fgSpacing); col++) {
          const x = col * fgSpacing + fgSpacing/2;
          const y = row * fgSpacing + fgSpacing/2;
          
          // Create 4 ellipses for petals
          flowerGrid.push(`
            <ellipse cx="${x}" cy="${y-petalSize/2}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(0 ${x} ${y})"/>
            <ellipse cx="${x+petalSize/2}" cy="${y}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(90 ${x} ${y})"/>
            <ellipse cx="${x}" cy="${y+petalSize/2}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(0 ${x} ${y})"/>
            <ellipse cx="${x-petalSize/2}" cy="${y}" rx="${petalSize/2}" ry="${petalSize}" fill="#E0E0E0" transform="rotate(90 ${x} ${y})"/>
            <circle cx="${x}" cy="${y}" r="${petalSize/4}" fill="#D8D8D8"/>
          `);
        }
      }
      
      pattern = `
        <g>
          ${flowerGrid.join('')}
        </g>
      `;
      break;
    
    case 'TwistRibbons':
      // Twist Ribbons pattern
      const twistRibbons = [];
      const twistRibbonsTrSpacing = 40; // Renamed from trSpacing
      const ribbonWidth = 2;
      const ribbonAmplitude = 15;
      
      for (let y = twistRibbonsTrSpacing / 2; y < height; y += twistRibbonsTrSpacing) {
        let pathD = `M 0 ${y}`;
        let pathD2 = `M 0 ${y + ribbonWidth}`;
        for (let x = 0; x < width; x += 15) {
          const yOffset = Math.sin(x * 0.05 + y * 0.03) * ribbonAmplitude;
          pathD += ` Q ${x+7.5} ${y+yOffset+ribbonWidth/2}, ${x+15} ${y+yOffset}`;
          pathD2 += ` Q ${x+7.5} ${y+yOffset+ribbonWidth*1.5}, ${x+15} ${y+yOffset+ribbonWidth}`;
        }
        twistRibbons.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        twistRibbons.push(`<path d="${pathD2}" stroke="#E0E0E0" stroke-width="1" fill="none"/>`);
        // Potentially add fill between paths or use a thicker stroke with gradients in future
      }
      
      pattern = `
        <g>
          ${twistRibbons.join('')}
        </g>
      `;
      break;
    
    case 'BounceDots':
      // Bounce Dots pattern
      const bounceDots = [];
      const bdSpacingX = 25;
      const bdAmplitude = height * 0.15;
      const bdFrequency = 0.08;
      
      for (let x = bdSpacingX; x < width; x += bdSpacingX) {
        const yOffset = Math.abs(Math.sin(x * bdFrequency)) * bdAmplitude;
        const y = height * 0.8 - yOffset;
        bounceDots.push(`<circle cx="${x}" cy="${y}" r="2.5" fill="#E0E0E0"/>`);
      }
      
      pattern = `
        <g>
          ${bounceDots.join('')}
        </g>
      `;
      break;
    
    case 'OrbitPaths':
      // Orbit Paths pattern
      const orbitPaths = [];
      const opSpacing = 60;
      const opRX = 20;
      const opRY = 12;
      
      for (let row = 0; row < Math.ceil(height / opSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / opSpacing); col++) {
          const x = col * opSpacing + opSpacing/2;
          const y = row * opSpacing + opSpacing/2;
          
          orbitPaths.push(`<ellipse cx="${x}" cy="${y}" rx="${opRX}" ry="${opRY}" stroke="#E0E0E0" stroke-width="0.8" fill="none"/>`);
          // Add a few dots on the orbit
          for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 + (x+y)*0.02; // Offset start angle
            const dotX = x + opRX * Math.cos(angle);
            const dotY = y + opRY * Math.sin(angle);
            orbitPaths.push(`<circle cx="${dotX}" cy="${dotY}" r="2" fill="#D8D8D8"/>`);
          }
        }
      }
      
      pattern = `
        <g>
          ${orbitPaths.join('')}
        </g>
      `;
      break;
    
    case 'OverlappingGrids':
      // Overlapping Grids pattern
      const overlappingGrids = [];
      const ogGridSpacing = 30;
      const offset = 8;
      
      // Grid 1
      overlappingGrids.push(`<g stroke="#DADADA" stroke-width="1">`);
      for (let x = ogGridSpacing; x < width; x += ogGridSpacing) { overlappingGrids.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}"/>`); }
      for (let y = ogGridSpacing; y < height; y += ogGridSpacing) { overlappingGrids.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}"/>`); }
      overlappingGrids.push(`</g>`);
      
      // Grid 2 (Offset)
      overlappingGrids.push(`<g stroke="#C8C8C8" stroke-width="1" transform="translate(${offset}, ${offset}) rotate(5)">`);
      for (let x = ogGridSpacing; x < width; x += ogGridSpacing) { overlappingGrids.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}"/>`); }
      for (let y = ogGridSpacing; y < height; y += ogGridSpacing) { overlappingGrids.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}"/>`); }
      overlappingGrids.push(`</g>`);
      
      pattern = `
        <g>
          ${overlappingGrids.join('')}
        </g>
      `;
      break;
    
    case 'RaindropScatter':
      // Raindrop Scatter pattern
      const raindropScatter = [];
      const dropCount = 80;
      
      for (let i = 0; i < dropCount; i++) {
        const x = Math.round((((i * 13) % 29) / 29) * width);
        const y = Math.round((((i * 19) % 31) / 31) * height);
        const size = 4 + ((i % 5) * 1.5);
        const rotation = 160 + Math.sin(i*0.5)*20; // Pointing mostly down
        
        // Teardrop shape path
        raindropScatter.push(`
          <path d="M 0 ${-size*1.5} C ${size} ${-size*1.5} ${size} ${size*0.5} 0 ${size*0.5} C ${-size} ${size*0.5} ${-size} ${-size*1.5} 0 ${-size*1.5} Z" 
                transform="translate(${x}, ${y}) rotate(${rotation}) scale(0.8)" fill="#E0E0E0"/>
        `);
      }
      
      pattern = `
        <g>
          ${raindropScatter.join('')}
        </g>
      `;
      break;
    
    case 'SunburstLines':
      // Sunburst Lines pattern
      const sunburstLines = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const numLines = 48;
      const maxLength = Math.max(width, height) * 0.7;
      
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const x2 = centerX + Math.cos(angle) * maxLength;
        const y2 = centerY + Math.sin(angle) * maxLength;
        sunburstLines.push(`<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" stroke="#E0E0E0" stroke-width="1"/>`);
      }
      
      pattern = `
        <g>
          ${sunburstLines.join('')}
        </g>
      `;
      break;
    
    case 'PebbleFloor':
      // Pebble Floor pattern
      const pebbleFloor = [];
      const pfSpacing = 25;
      
      for (let row = 0; row < Math.ceil(height / pfSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / pfSpacing); col++) {
          const x = col * pfSpacing + pfSpacing/2;
          const y = row * pfSpacing + pfSpacing/2;
          const sizeX = 6 + Math.sin(x * 0.1 + y * 0.05) * 3;
          const sizeY = 6 + Math.cos(y * 0.1 + x * 0.05) * 3;
          const rotation = (x + y) * 2;
          pebbleFloor.push(`<ellipse cx="${x}" cy="${y}" rx="${sizeX}" ry="${sizeY}" transform="rotate(${rotation} ${x} ${y})" fill="#E0E0E0"/>`);
        }
      }
      
      pattern = `
        <g>
          ${pebbleFloor.join('')}
        </g>
      `;
      break;
    
    case 'PixelBlocks':
      // Pixel Blocks pattern
      const pixelBlocks = [];
      const pbSpacing = 30; // Increased spacing
      const blockSize = 6; // Increased size
      for (let row = 0; row < Math.ceil(height / pbSpacing); row++) {
        for (let col = 0; col < Math.ceil(width / pbSpacing); col++) {
          const x = col * pbSpacing + pbSpacing/2;
          const y = row * pbSpacing + pbSpacing/2;
          const clusterType = (row + col) % 3;
          if (clusterType === 0) { // 2x2 Block
            pixelBlocks.push(`<rect x=\"${x-blockSize}\" y=\"${y-blockSize}\" width=\"${blockSize*2}\" height=\"${blockSize*2}\" fill=\"#E0E0E0\"/>`);
          } else if (clusterType === 1) { // L-shape
            pixelBlocks.push(`<rect x=\"${x}\" y=\"${y-blockSize}\" width=\"${blockSize}\" height=\"${blockSize*2}\" fill=\"#E0E0E0\"/>`);
            pixelBlocks.push(`<rect x=\"${x-blockSize}\" y=\"${y}\" width=\"${blockSize}\" height=\"${blockSize}\" fill=\"#E0E0E0\"/>`);
          }
          // Type 2 leaves a gap
        }
      }
      pattern = `
        <g>
          ${pixelBlocks.join('\\n')}
        </g>
      `;
      break;

      case 'TriangleSpirals':
        // Triangle Spirals pattern
        const triangleSpirals = [];
        const tsSpiralCount = Math.ceil(width / 250); // Adjust count based on width
        const trianglesPerSpiral = 25; // Increased count
        const tsMaxRadius = Math.min(width, height) / (tsSpiralCount * 1.5); // Adjust radius
        
        for (let spiral = 0; spiral < tsSpiralCount; spiral++) {
          const centerX = width * (spiral + 0.5) / tsSpiralCount;
          const centerY = height / 2; // Center vertically
          for (let i = 0; i < trianglesPerSpiral; i++) {
            const angle = i * 0.7; // Adjusted angle step
            const radius = (i / trianglesPerSpiral) * tsMaxRadius;
            const triX = centerX + Math.cos(angle) * radius;
            const triY = centerY + Math.sin(angle) * radius;
            const triSize = 4 + i * 0.4; // Increased size
            triangleSpirals.push(`<polygon points=\"${triX},${triY-triSize} ${triX-triSize*0.866},${triY+triSize*0.5} ${triX+triSize*0.866},${triY+triSize*0.5}\" transform=\"rotate(${angle*60} ${triX} ${triY})\" fill=\"#E0E0E0\"/>`);
          }
        }
        pattern = `
          <g>
            ${triangleSpirals.join('\\n')}
          </g>
        `;
        break;

      case 'OffsetCubes':
        // Offset Cubes pattern
        const offsetCubes = [];
        const ocSize = 15; // Increased size
        const ocSpacingX = ocSize * 1.732;
        const ocSpacingY = ocSize * 1.5;
        for (let row = -1; row < Math.ceil(height / ocSpacingY) + 1; row++) {
          for (let col = -1; col < Math.ceil(width / ocSpacingX) + 1; col++) {
            const x = col * ocSpacingX + (row % 2) * (ocSpacingX / 2);
            const y = row * ocSpacingY;
            // Draw top, left, right faces
            offsetCubes.push(`<polygon points=\"${x},${y} ${x+ocSpacingX/2},${y-ocSize/2} ${x},${y-ocSize} ${x-ocSpacingX/2},${y-ocSize/2} Z\" fill=\"#F0F0F0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Top
            offsetCubes.push(`<polygon points=\"${x},${y} ${x-ocSpacingX/2},${y-ocSize/2} ${x-ocSpacingX/2},${y+ocSize/2} ${x},${y+ocSize} Z\" fill=\"#E0E0E0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Left
            offsetCubes.push(`<polygon points=\"${x},${y} ${x+ocSpacingX/2},${y-ocSize/2} ${x+ocSpacingX/2},${y+ocSize/2} ${x},${y+ocSize} Z\" fill=\"#D0D0D0\" stroke=\"#D8D8D8\" stroke-width=\"0.5\"/>`); // Right
          }
        }
        pattern = `
          <g>
            ${offsetCubes.join('\\n')}
          </g>
        `;
        break;

      case 'InterlockingRings':
        // Interlocking Rings pattern
        const interlockingRings = [];
        const irSpacingX = 25; // Increased spacing
        const irSpacingY = 18; // Increased spacing
        const irRadius = 15; // Increased radius
        for (let row = 0; row < Math.ceil(height / irSpacingY); row++) {
          for (let col = 0; col < Math.ceil(width / irSpacingX); col++) {
            const x = col * irSpacingX + (row % 2 ? irSpacingX / 2 : 0);
            const y = row * irSpacingY;
            interlockingRings.push(`<circle cx=\"${x}\" cy=\"${y}\" r=\"${irRadius}\" stroke=\"#E0E0E0\" stroke-width=\"1.2\" fill=\"none\"/>`); // Increased stroke-width
          }
        }
        pattern = `
          <g>
            ${interlockingRings.join('\\n')}
          </g>
        `;
        break;

      case '3DZigzags':
        // 3D Zigzags pattern
        const threeDZigzags = [];
        const zzSpacing = 30; // Increased spacing
        const zzHeight = 12; // Increased size
        const zzDepth = 4; // Increased depth
        for (let y = zzSpacing; y < height; y += zzSpacing * 1.5) {
          let pathD = `M 0 ${y}`;
          let shadowD = `M ${zzDepth} ${y + zzDepth}`;
          for (let x = 0; x < width; x += zzHeight * 2) {
            pathD += ` L ${x+zzHeight} ${y-zzHeight/2} L ${x+zzHeight*2} ${y}`;
            shadowD += ` L ${x+zzHeight+zzDepth} ${y-zzHeight/2+zzDepth} L ${x+zzHeight*2+zzDepth} ${y+zzDepth}`;
          }
          threeDZigzags.push(`<path d=\"${shadowD}\" stroke=\"#C8C8C8\" stroke-width=\"1\" fill=\"none\"/>`);
          threeDZigzags.push(`<path d=\"${pathD}\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
        }
        pattern = `
          <g>
            ${threeDZigzags.join('\\n')}
          </g>
        `;
        break;

      case 'DoodleLoops':
        // Doodle Loops pattern
        const doodleLoops = [];
        const doodleLoopsDlSpacing = 40; // Renamed from dlSpacing
        for (let row = 0; row < Math.ceil(height / doodleLoopsDlSpacing); row++) {
          for (let col = 0; col < Math.ceil(width / doodleLoopsDlSpacing); col++) {
              const x = col * doodleLoopsDlSpacing + doodleLoopsDlSpacing/2;
              const y = row * doodleLoopsDlSpacing + doodleLoopsDlSpacing/2;
              const rotation = (x + y) * 2; // Simpler rotation
              doodleLoops.push(`<path d=\"M ${x-12} ${y} C ${x-12} ${y-15}, ${x+12} ${y-15}, ${x+12} ${y} S ${x-12} ${y+15}, ${x-12} ${y}\" transform=\"rotate(${rotation} ${x} ${y})\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
          }
        }
        pattern = `
          <g>
            ${doodleLoops.join('\\n')}
          </g>
        `;
        break;

      case 'ThinSlashGrid':
        // Thin Slash Grid pattern
        const thinSlashGrid = [];
        const tsgSpacing = 10; // Increased spacing
        const tsgLineLength = Math.max(width, height) * 1.5; // Renamed from lineLength, ensure lines cover the area
        for (let i = -Math.ceil(height / tsgSpacing) - Math.ceil(width / tsgSpacing); i < Math.ceil(width / tsgSpacing) + Math.ceil(height / tsgSpacing); i++) {
          const startX = i * tsgSpacing;
          // Forward slashes
          thinSlashGrid.push(`<line x1=\"${startX}\" y1=\"0\" x2=\"${startX - tsgLineLength}\" y2=\"${tsgLineLength}\" stroke=\"#D8D8D8\" stroke-width=\"0.7\"/>`);
          // Backward slashes
          thinSlashGrid.push(`<line x1=\"${startX}\" y1=\"0\" x2=\"${startX + tsgLineLength}\" y2=\"${tsgLineLength}\" stroke=\"#D8D8D8\" stroke-width=\"0.7\"/>`);
        }
        pattern = `
          <g>
            ${thinSlashGrid.join('\\n')}
          </g>
        `;
        break;

      case 'ParallelCurves':
        // Parallel Curves pattern
        const parallelCurves = [];
        const pcSpacing = 20; // Increased spacing
        const numCurves = Math.ceil(height / pcSpacing);
        const pcAmplitude = 10; // Renamed from amplitude, Increased amplitude
        const pcFrequency = 0.03; // Renamed from frequency, Adjusted frequency

        for (let i = 0; i < numCurves; i++) {
          const yOffset = i * pcSpacing + pcSpacing / 2;
          let pathD = `M 0 ${yOffset}`;
          for (let x = 0; x <= width; x += 10) {
            const y = yOffset + Math.sin(x * pcFrequency + i * 0.5) * pcAmplitude;
            pathD += ` L ${x} ${y}`;
          }
          parallelCurves.push(`<path d=\"${pathD}\" stroke=\"#E0E0E0\" stroke-width=\"1.2\" fill=\"none\"/>`);
        }
        pattern = `
          <g>
            ${parallelCurves.join('\\n')}
          </g>
        `;
        break;

        case 'StarDotCluster': { // <-- Added opening brace
        // Star + Dot Cluster pattern
        const starDotCluster = [];
        const sdcSpacing = 50; // Increased spacing
        const starSize = 8; // Increased star size
        const dotRadius = 1.5; // Increased dot size
        const dotClusterRadius = 12; // Increased cluster radius

        for (let row = 0; row < Math.ceil(height / sdcSpacing); row++) {
          for (let col = 0; col < Math.ceil(width / sdcSpacing); col++) {
            const x = col * sdcSpacing + sdcSpacing/2;
            const y = row * sdcSpacing + sdcSpacing/2;
            // Star
            starDotCluster.push(`<path d=\"M ${x} ${y-starSize} L ${x+starSize*0.3} ${y-starSize*0.3} L ${x+starSize} ${y} L ${x+starSize*0.3} ${y+starSize*0.3} L ${x} ${y+starSize} L ${x-starSize*0.3} ${y+starSize*0.3} L ${x-starSize} ${y} L ${x-starSize*0.3} ${y-starSize*0.3} Z\" fill=\"#E0E0E0\"/>`);
            // Dots
            for (let i = 0; i < 6; i++) { // Increased dot count
              const angle = (i / 6) * Math.PI * 2 + (x+y)*0.01;
              const dotX = x + Math.cos(angle) * dotClusterRadius;
              const dotY = y + Math.sin(angle) * dotClusterRadius;
              starDotCluster.push(`<circle cx=\"${dotX}\" cy=\"${dotY}\" r=\"${dotRadius}\" fill=\"#D8D8D8\"/>`);
            }
          }
        }
        pattern = `
          <g>
            ${starDotCluster.join('\\n')}
          </g>
        `;
        break;
        } // <-- Added closing brace

        case 'LineLeaf': { // <-- Added opening brace
        // Line & Leaf pattern
        const lineLeaf = [];
        const llLineSpacing = 25; // Increased spacing
        const leafSpacing = 50; // Increased spacing
        const leafScale = 1.0; // Increased scale

          for (let y = llLineSpacing; y < frame.height; y += llLineSpacing) {
            lineLeaf.push(`<line x1=\"0\" y1=\"${y}\" x2=\"${frame.width}\" y2=\"${y}\" stroke=\"#E0E0E0\" stroke-width=\"1\"/>`);
          // Add leaves
            for (let x = leafSpacing; x < frame.width; x += leafSpacing) {
            if ((Math.floor(x / leafSpacing) + Math.floor(y / llLineSpacing)) % 2 === 0) { // Alternate placement
               const leafSize = 4 * leafScale;
               const rotation = (x+y)*3;
               lineLeaf.push(`<path d=\"M ${x} ${y-leafSize*0.25} c -${leafSize*0.75} -${leafSize*0.5} -${leafSize*0.75} -${leafSize*1.25} 0 -${leafSize*1.25} c ${leafSize*0.75} 0 ${leafSize*0.75} ${leafSize*0.75} 0 ${leafSize*1.25} M ${x} ${y-leafSize*0.25} c ${leafSize*0.75} -${leafSize*0.5} ${leafSize*0.75} -${leafSize*1.25} 0 -${leafSize*1.25}\" fill=\"#D8D8D8\" transform=\"rotate(${rotation} ${x} ${y}) scale(${leafScale})\"/>`);
                }
              }
            }
            pattern = `
              <g>
                ${lineLeaf.join('\\n')}
              </g>
            `;
            break;
         } // <-- Added closing brace

        case 'TearGrid': { // <-- Added opening brace
        // Tear Grid pattern
        const tearGrid = [];
        const tgSpacing = 25; // Increased spacing
        const tearSize = 6; // Increased size

          for (let row = 0; row < Math.ceil(frame.height / tgSpacing); row++) {
            for (let col = 0; col < Math.ceil(frame.width / tgSpacing); col++) {
            const x = col * tgSpacing + tgSpacing/2;
            const y = row * tgSpacing + tgSpacing/2;
            const rotation = ((row + col) % 4) * 90 + 15; // Add rotation
            tearGrid.push(`<path d=\"M 0 ${-tearSize*1.5} C ${tearSize} ${-tearSize*1.5} ${tearSize} ${tearSize*0.5} 0 ${tearSize*0.5} C ${-tearSize} ${tearSize*0.5} ${-tearSize} ${-tearSize*1.5} 0 ${-tearSize*1.5} Z\" transform=\"translate(${x}, ${y}) rotate(${rotation}) scale(0.8)\" fill=\"#E0E0E0\"/>`);
          }
        }
        pattern = `
          <g>
            ${tearGrid.join('\\n')}
          </g>
        `;
        break;
        } // <-- Added closing brace

        case 'EyeSymbols': { // <-- Added opening brace
        // Eye Symbols pattern
        const eyeSymbols = [];
          const eyeCount = Math.ceil((frame.width * frame.height) / (60*60)); // Adjust count based on area

        for (let i = 0; i < eyeCount; i++) {
          // Use more structured placement instead of pure random for consistency
          const gridDim = Math.ceil(Math.sqrt(eyeCount));
            const cellWidth = frame.width / gridDim;
            const cellHeight = frame.height / gridDim;
          const gridX = (i % gridDim) * cellWidth;
          const gridY = Math.floor(i / gridDim) * cellHeight;
          
          // Add some random offset within the cell
          const x = gridX + cellWidth * (0.3 + Math.random() * 0.4);
          const y = gridY + cellHeight * (0.3 + Math.random() * 0.4);
          
          const eyeRX = 10; // Increased size
          const eyeRY = 5; // Increased size
          const pupilR = 2.5; // Increased size

          eyeSymbols.push(`<ellipse cx=\"${x}\" cy=\"${y}\" rx=\"${eyeRX}\" ry=\"${eyeRY}\" stroke=\"#E0E0E0\" stroke-width=\"1\" fill=\"none\"/>`);
          eyeSymbols.push(`<circle cx=\"${x}\" cy=\"${y}\" r=\"${pupilR}\" fill=\"#E0E0E0\"/>`);
        }
        pattern = `
          <g>
            ${eyeSymbols.join('\\n')}
          </g>
        `;
        break;
        } // <-- Added closing brace

        case 'PuzzleGrid': { // <-- Added opening brace
        // Puzzle Grid pattern
        const puzzleGrid = [];
          const pzSize = 40; // Size of each puzzle piece

          for (let row = 0; row < Math.ceil(frame.height / pzSize); row++) {
            for (let col = 0; col < Math.ceil(frame.width / pzSize); col++) {
            const x = col * pzSize;
            const y = row * pzSize;
            
              // Define nub positions (0:none, 1:out, -1:in) pseudo-randomly based on pos
              const topNub = (row > 0) ? (((col + row*3) % 3) - 1) : 0;
              const rightNub = (col < Math.ceil(frame.width / pzSize) - 1) ? (((col*3 + row) % 3) - 1) : 0;
              const bottomNub = (row < Math.ceil(height / pzSize) - 1) ? -topNub : 0; // Ensure matching nub
              const leftNub = (col > 0) ? -((((col-1)*3 + row) % 3) - 1) : 0; // Ensure matching nub from left

              const nW = pzSize * 0.2; // Nub width based on piece size
              const nH = pzSize * 0.15; // Nub height based on piece size
              const c = 0.551915 * nH * 0.5; // Control point calculation factor for circular nub approx

            let pathD = `M ${x} ${y}`;

              // Top Edge
              pathD += ` l ${pzSize*0.35} 0`;
            if (topNub !== 0) {
                pathD += ` l 0 ${-topNub*nH*0.5}`; // Start of nub curve
                pathD += ` c ${nW*0.25} ${-topNub*nH*0.4} ${nW*0.75} ${-topNub*nH*0.4} ${nW} 0`; // Nub arc
                pathD += ` l 0 ${topNub*nH*0.5}`; // End of nub curve
              }
              pathD += ` l ${pzSize*0.35} 0`; // To top-right corner

              // Right Edge
              pathD += ` l 0 ${pzSize*0.35}`;
             if (rightNub !== 0) {
                pathD += ` l ${rightNub*nH*0.5} 0`;
                pathD += ` c ${rightNub*nH*0.4} ${nW*0.25} ${rightNub*nH*0.4} ${nW*0.75} 0 ${nW}`;
                pathD += ` l ${-rightNub*nH*0.5} 0`;
              }
              pathD += ` l 0 ${pzSize*0.35}`; // To bottom-right corner

              // Bottom Edge
              pathD += ` l ${-pzSize*0.35} 0`;
             if (bottomNub !== 0) {
                pathD += ` l 0 ${bottomNub*nH*0.5}`;
                pathD += ` c ${-nW*0.25} ${bottomNub*nH*0.4} ${-nW*0.75} ${bottomNub*nH*0.4} ${-nW} 0`;
                pathD += ` l 0 ${-bottomNub*nH*0.5}`;
              }
              pathD += ` l ${-pzSize*0.35} 0`; // To bottom-left corner

              // Left Edge
              pathD += ` l 0 ${-pzSize*0.35}`;
            if (leftNub !== 0) {
                pathD += ` l ${-leftNub*nH*0.5} 0`;
                pathD += ` c ${-leftNub*nH*0.4} ${-nW*0.25} ${-leftNub*nH*0.4} ${-nW*0.75} 0 ${-nW}`;
                pathD += ` l ${leftNub*nH*0.5} 0`;
              }
              pathD += ` Z`; // Close path (back to top-left)

            puzzleGrid.push(`<path d="${pathD}" stroke="#E0E0E0" stroke-width="1" fill="#F0F0F0"/>`);
          }
        }
        pattern = `
          <g>
              ${puzzleGrid.join('')}
          </g>
        `;
        break;
        } // <-- Added closing brace

        // ------------------- NEW PATTERNS START (Batch 2) -------------------

        // Visual Texture / Noise
        case 'GrainNoise': {
          // Generate SVG for Grain Noise using small, semi-transparent circles
          const grains = [];
          const numGrains = Math.floor((width * height) / 150); // Further reduced density
          for (let i = 0; i < numGrains; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.5 + Math.random() * 1;
            const opacity = 0.05 + Math.random() * 0.15;
            grains.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#808080" fill-opacity="${opacity}"/>`);
          }
          pattern = `<g>${grains.join('\n')}</g>`;
          break;
        }

        case 'StaticTVDots': {
          // Generate SVG for Static TV Dots with random dots and occasional lines
          const elements = [];
          const numDots = Math.floor((width * height) / 200); // Further reduced density
          for (let i = 0; i < numDots; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 1 + Math.random() * 1.5;
            const opacity = 0.1 + Math.random() * 0.6;
            elements.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#999999" fill-opacity="${opacity}"/>`);
            // Add occasional horizontal line artifact
            if (Math.random() < 0.02) {
              const lineWidth = width * (0.1 + Math.random() * 0.4);
              const lineX = Math.random() * width * 0.6;
              elements.push(`<rect x="${lineX}" y="${y - 0.5}" width="${lineWidth}" height="1" fill="#FFFFFF" fill-opacity="0.4"/>`);
            }
          }
          pattern = `<g>${elements.join('\n')}</g>`;
          break;
        }

        case 'SpeckledInk': {
          // Generate SVG for Speckled Ink with varying dot sizes
          const speckles = [];
          const numSpeckles = Math.floor((width * height) / 300); // Further reduced density
          for (let i = 0; i < numSpeckles; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 1 + Math.random() * 2; // Size variation
            const opacity = 0.2 + Math.random() * 0.7;
            speckles.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#333333" fill-opacity="${opacity}"/>`);
          }
          pattern = `<g>${speckles.join('\n')}</g>`;
          break;
        }

        case 'BlurWaves': {
           // Generate SVG for Blur Waves - Simplified SVG, rely on fallback
           pattern = `
              <rect width="100%" height="100%" fill="#E0E8F0" />
              <text x="10" y="20" font-size="10" fill="#AAAAAA">Blur Waves (Fallback)</text>
            `; // Placeholder SVG
          break;
        }

        case 'DustFlecks': {
          // Generate SVG for Dust Flecks - very small, sparse dots
          const flecks = [];
          const numFlecks = Math.floor((width * height) / 400); // Further reduced density
          for (let i = 0; i < numFlecks; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = 0.4 + Math.random() * 0.8; // Smaller size
            const opacity = 0.1 + Math.random() * 0.4;
            flecks.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#B3B3B3" fill-opacity="${opacity}"/>`);
          }
          pattern = `<g>${flecks.join('\n')}</g>`;
          break;
        }

        case 'PaperCrinkleLines': {
          // Generate SVG for Paper Crinkle Lines using slightly randomized paths
          const lines = [];
          const numLines = 15;
          for (let i = 0; i < numLines; i++) {
            const numPoints = 5 + Math.floor(Math.random() * 10);
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            const endX = startX + (Math.random() - 0.5) * width * 0.4;
            const endY = startY + (Math.random() - 0.5) * height * 0.4;
            let pathD = `M ${startX} ${startY}`;
            for (let j = 1; j < numPoints; j++) {
              const t = j / (numPoints - 1);
              const currentX = startX + (endX - startX) * t + (Math.random() - 0.5) * 20;
              const currentY = startY + (endY - startY) * t + (Math.random() - 0.5) * 20;
              pathD += ` L ${currentX} ${currentY}`;
            }
            const strokeWidth = 0.4 + Math.random() * 0.6;
            const opacity = 0.3 + Math.random() * 0.4;
            lines.push(`<path d="${pathD}" stroke="#D9D9D9" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
          }
          pattern = `<g>${lines.join('\n')}</g>`;
          break;
        }

        // Motion / Flow
        case 'SwirlVortex': {
          // Generate SVG for Swirl Vortex using spiral paths
          const arms = [];
          const numArms = 3 + Math.floor(Math.random() * 3);
          const centerX = width / 2;
          const centerY = height / 2;
          const maxRadius = Math.min(width, height) * 0.5;

          for (let i = 0; i < numArms; i++) {
            const pointsPerArm = 40;
            const angleOffset = (i / numArms) * Math.PI * 2;
            const twistFactor = 5 + Math.random() * 5;
            let pathD = `M ${centerX} ${centerY}`;
            for (let j = 1; j < pointsPerArm; j++) {
              const radius = (j / pointsPerArm) * maxRadius;
              const angle = angleOffset + (j / pointsPerArm) * twistFactor;
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;
              pathD += ` L ${x} ${y}`;
            }
            const strokeWidth = 0.5 + Math.random() * 1.5;
            const opacity = 0.5 + Math.random() * 0.3;
            arms.push(`<path d="${pathD}" stroke="#CCCCCC" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
          }
          pattern = `<g>${arms.join('\n')}</g>`;
          break;
        }

        case 'TiltedStripes': {
          // Generate SVG for Tilted Stripes using rotated rects
          const stripes = [];
          const numStripes = 25;
          const stripeWidth = 4;
          const stripeLength = Math.max(width, height) * 1.5;
          for (let i = 0; i < numStripes; i++) {
            const centerX = width / 2;
            const centerY = height * ( (i+0.5) / numStripes );
            const x = centerX - stripeLength / 2;
            const y = centerY - stripeWidth / 2;
            const rotation = 30 + (Math.random() - 0.5) * 20; // Base tilt + variation
            stripes.push(`<rect x="${x}" y="${y}" width="${stripeLength}" height="${stripeWidth}" fill="#E0E0E0" transform="rotate(${rotation} ${centerX} ${centerY})"/>`);
          }
          pattern = `<g>${stripes.join('\n')}</g>`;
          break;
        }

        case 'StreamLines': {
          // Generate SVG for Stream Lines using curved paths
          const lines = [];
          const numLines = 12;
          for (let i = 0; i < numLines; i++) {
            const startY = (i / numLines) * height * 1.1 - height * 0.05;
            const endY = startY + (Math.random() - 0.5) * height * 0.4;
            const midX1 = width * (0.2 + Math.random() * 0.2);
            const midY1 = startY + (Math.random() - 0.5) * height * 0.3;
            const midX2 = width * (0.6 + Math.random() * 0.2);
            const midY2 = startY + (Math.random() - 0.5) * height * 0.3;
            const startX = -width * 0.05;
            const endX = width * 1.05;
            const cp1X = startX + (midX1 - startX) * 1.5;
            const cp1Y = startY + (midY1 - startY) * 1.5;
            const cp2X = endX + (midX2 - endX) * 1.5;
            const cp2Y = endY + (midY2 - endY) * 1.5;

            const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
            const strokeWidth = 0.5 + Math.random() * 1;
            const opacity = 0.4 + Math.random() * 0.4;
            lines.push(`<path d="${pathD}" stroke="#CCD9E6" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
          }
          pattern = `<g>${lines.join('\n')}</g>`;
          break;
        }

        case 'SineWaves': {
          // Generate SVG for Sine Waves using path elements
          const waves = [];
          const numWaves = Math.ceil(height / 25);
          const amplitude = 8;
          const frequency = 0.04;

          for (let i = 0; i < numWaves; i++) {
            const yOffset = (i + 0.5) * 25;
            let pathD = `M 0 ${yOffset + Math.sin(0 + i * 0.5) * amplitude}`;
            const pointsPerWave = Math.ceil(width / 8);
            for (let j = 1; j <= pointsPerWave; j++) {
               const x = (j / pointsPerWave) * width;
               const y = yOffset + Math.sin(x * frequency + i * 0.5) * amplitude;
               pathD += ` L ${x} ${y}`;
            }
            waves.push(`<path d="${pathD}" stroke="#D9D9D9" stroke-width="1" fill="none"/>`);
          }
          pattern = `<g>${waves.join('\n')}</g>`;
          break;
        }

        case 'ExpandingCircles': {
          // Generate SVG for Expanding Circles
          const sets = [];
          const numSets = 3 + Math.floor(Math.random() * 3);
          for (let i = 0; i < numSets; i++) {
            const centerX = width * (0.1 + Math.random() * 0.8);
            const centerY = height * (0.1 + Math.random() * 0.8);
            const maxRadius = 30 + Math.random() * 40;
            const numCircles = 5 + Math.floor(Math.random() * 4);
            for (let j = 0; j < numCircles; j++) {
              const radius = ( (j+1) / numCircles ) * maxRadius;
              const strokeWidth = 0.5 + Math.random();
              const opacity = 1 - (j / numCircles) * 0.7; // Fade out
              sets.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="#E5E5E5" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" fill="none"/>`);
            }
          }
          pattern = `<g>${sets.join('\n')}</g>`;
          break;
        }

        // ------------------- NEW PATTERNS END (Batch 2) -------------------

        case 'StickyNote': {
          const notes = [];
          const noteSize = 60;
          const spacing = noteSize * 0.8;
          const colors = ["#FDF8B4", "#E0E0E0"]; // Yellowish, Grayish
          for (let row = 0; row * spacing < frame.height + noteSize; row++) {
            for (let col = 0; col * spacing < frame.width + noteSize; col++) {
              const x = col * spacing + (Math.random() - 0.5) * 10 - noteSize / 2;
              const y = row * spacing + (Math.random() - 0.5) * 10 - noteSize / 2;
              const rotation = (Math.random() - 0.5) * 15;
              notes.push(`
                <rect x="${x}" y="${y}" width="${noteSize}" height="${noteSize}" 
                      rx="4" ry="4" 
                      fill="${colors[(row + col) % 2]}" fill-opacity="0.8" 
                      stroke="#B0B0B0" stroke-width="0.5" stroke-opacity="0.5" 
                      transform="rotate(${rotation} ${x + noteSize/2} ${y + noteSize/2})"/>
              `);
            }
          }
          pattern = `<g>${notes.join('\\n')}</g>`;
          break;
        }
        case 'Perlin': {
          // Use feTurbulence for Perlin noise effect - Simplified SVG, rely on fallback
          pattern = `
            <rect width="100%" height="100%" fill="#F0F0F0" />
            <text x="10" y="20" font-size="10" fill="#AAAAAA">Perlin Noise (Fallback)</text>
          `; // Placeholder SVG
          break;
        }
        case 'Marble': {
          // Use turbulence + displacement for marble effect - Simplified SVG, rely on fallback
          pattern = `
            <rect width="100%" height="100%" fill="#E5E5E5" />
            <line x1="10" y1="10" x2="${width - 10}" y2="${height - 10}" stroke="#CCCCCC" stroke-width="2"/>
            <line x1="10" y1="${height - 10}" x2="${width - 10}" y2="10" stroke="#CCCCCC" stroke-width="2"/>
            <text x="10" y="20" font-size="10" fill="#AAAAAA">Marble (Fallback)</text>
          `; // Placeholder SVG
          break;
        }
        case 'Mesh': {
          const meshLines = [];
          const gridSize = 80; // Further increased grid size
          const distortion = 8; // Further reduced distortion

          // Horizontal lines
          for (let y = 0; y <= frame.height; y += gridSize) {
            let pathD = `M 0 ${y + (Math.random() - 0.5) * distortion}`;
            for (let x = gridSize; x <= frame.width; x += gridSize) {
              const currentY = y + (Math.random() - 0.5) * distortion;
              const prevX = x - gridSize;
              const prevY = parseFloat(pathD.substring(pathD.lastIndexOf(' ')+1)); // Risky, assumes last point Y
              const cp1X = prevX + gridSize * 0.3;
              const cp1Y = prevY + (Math.random() - 0.5) * distortion * 0.5;
              const cp2X = x - gridSize * 0.3;
              const cp2Y = currentY + (Math.random() - 0.5) * distortion * 0.5;
              pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${currentY}`;
            }
            meshLines.push(`<path d="${pathD}" stroke="#C8C8C8" stroke-width="0.8" fill="none"/>`);
          }
          // Vertical lines
           for (let x = 0; x <= frame.width; x += gridSize) {
             let pathD = `M ${x + (Math.random() - 0.5) * distortion} 0`;
             for (let y = gridSize; y <= frame.height; y += gridSize) {
               const currentX = x + (Math.random() - 0.5) * distortion;
               const prevY = y - gridSize;
               const prevX = parseFloat(pathD.substring(pathD.lastIndexOf(' ')+1)); // Risky, assumes last point X
               const cp1X = prevX + (Math.random() - 0.5) * distortion * 0.5;
               const cp1Y = prevY + gridSize * 0.3;
               const cp2X = currentX + (Math.random() - 0.5) * distortion * 0.5;
               const cp2Y = y - gridSize * 0.3;
               pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${currentX} ${y}`;
             }
             meshLines.push(`<path d="${pathD}" stroke="#C8C8C8" stroke-width="0.8" fill="none"/>`);
           }
          pattern = `<g>${meshLines.join('\\n')}</g>`;
          break;
        }

      default: {
        // Default to grid pattern
        // ... existing code ...
      }
    }
    
    return svgStart + pattern + svgEnd;
  }
