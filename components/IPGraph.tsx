'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useIPStore } from '@/store/ipStore'
import { IPGraphNode, IPGraphEdge } from '@/types'
import { ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react'

interface IPGraphProps {
  width?: number
  height?: number
  onNodeClick?: (nodeId: string) => void
}

export default function IPGraph({ width = 1200, height = 800, onNodeClick }: IPGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { assets } = useIPStore()
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (!svgRef.current || assets.length === 0) return

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const g = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        setZoomLevel(event.transform.k)
      })

    svg.call(zoom as any)

    // Create nodes and edges
    const nodes: IPGraphNode[] = assets.map((asset) => ({
      id: asset.id,
      asset,
    }))

    const edges: IPGraphEdge[] = assets
      .filter((asset) => asset.parentId)
      .map((asset) => ({
        source: asset.parentId!,
        target: asset.id,
      }))

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(edges)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))

    // Create edges
    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', '#6366f1')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)')

    // Create arrow marker
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#6366f1')

    // Create nodes
    const node = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        d3
          .drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('click', (event, d) => {
        event.stopPropagation()
        if (onNodeClick) onNodeClick(d.id)
      })

    // Add circles to nodes
    node
      .append('circle')
      .attr('r', 30)
      .attr('fill', (d) => {
        switch (d.asset.ipType) {
          case 'Original':
            return '#3b82f6' // Blue
          case 'Remix':
            return '#10b981' // Green
          case 'Derivative':
            return '#a855f7' // Purple
          default:
            return '#6b7280'
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')

    // Add labels
    node
      .append('text')
      .text((d) => d.asset.title)
      .attr('dx', 40)
      .attr('dy', 5)
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')

    // Add type badges
    node
      .append('text')
      .text((d) => d.asset.ipType)
      .attr('dx', 40)
      .attr('dy', 20)
      .attr('fill', '#9ca3af')
      .attr('font-size', '10px')

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '8px 12px')
      .style('background', 'rgba(0, 0, 0, 0.9)')
      .style('border', '1px solid #6366f1')
      .style('border-radius', '8px')
      .style('color', '#fff')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000)

    node
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`
            <div><strong>${d.asset.title}</strong></div>
            <div>Type: ${d.asset.ipType}</div>
            <div>License: ${d.asset.licenseType}</div>
            <div>Creator: ${d.asset.creator.slice(0, 6)}...${d.asset.creator.slice(-4)}</div>
            <div>Derivatives: ${d.asset.derivatives.length}</div>
          `)
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`)
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Expose zoom controls
    ;(svg.node() as any).__zoom = zoom

    // Cleanup
    return () => {
      tooltip.remove()
      simulation.stop()
    }
  }, [assets, width, height, onNodeClick])

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current)
    const zoom = (svg.node() as any).__zoom
    if (zoom) {
      svg.transition().duration(300).call(zoom.scaleBy, 1.3)
    }
  }

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current)
    const zoom = (svg.node() as any).__zoom
    if (zoom) {
      svg.transition().duration(300).call(zoom.scaleBy, 0.7)
    }
  }

  const handleZoomReset = () => {
    const svg = d3.select(svgRef.current)
    const zoom = (svg.node() as any).__zoom
    if (zoom) {
      svg.transition().duration(500).call(
        zoom.transform,
        d3.zoomIdentity
      )
    }
  }

  const handleFitView = () => {
    const svg = d3.select(svgRef.current)
    const g = svg.select('g')
    const bounds = (g.node() as any)?.getBBox()
    
    if (!bounds) return

    const fullWidth = width
    const fullHeight = height
    const widthRatio = fullWidth / bounds.width
    const heightRatio = fullHeight / bounds.height
    const scale = Math.min(widthRatio, heightRatio) * 0.9

    const translateX = (fullWidth - bounds.width * scale) / 2 - bounds.x * scale
    const translateY = (fullHeight - bounds.height * scale) / 2 - bounds.y * scale

    const zoom = (svg.node() as any).__zoom
    if (zoom) {
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale)
      )
    }
  }

  if (assets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <p className="text-lg mb-2">No IP assets registered yet</p>
          <p className="text-sm">Register your first IP to see the graph visualization</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
      <svg ref={svgRef} width={width} height={height} className="w-full h-full" />
      
      {/* Graph Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-colors shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-colors shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomReset}
          className="p-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-colors shadow-lg"
          title="Reset Zoom"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
        <button
          onClick={handleFitView}
          className="p-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-colors shadow-lg"
          title="Fit to View"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      
      {/* Zoom Level Indicator */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-slate-800/90 border border-slate-600 rounded-lg text-white text-sm font-medium shadow-lg">
        {Math.round(zoomLevel * 100)}%
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-slate-800/90 border border-slate-600 rounded-lg p-3 shadow-lg">
        <h4 className="text-white font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-300 text-xs">Original</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-300 text-xs">Remix</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-gray-300 text-xs">Derivative</span>
          </div>
        </div>
      </div>
    </div>
  )
}

