import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { SmtPad } from "lib/components/primitive-components/SmtPad"
import { createComponentsFromCircuitJson } from "lib/utils/createComponentsFromCircuitJson"

test("createComponentsFromCircuitJson anchors imported polygon smtpads", () => {
  const components = createComponentsFromCircuitJson(
    {
      componentName: "U1",
      componentRotation: "0deg",
    },
    [
      {
        type: "pcb_smtpad",
        shape: "polygon",
        pcb_smtpad_id: "pcb_smtpad_0",
        layer: "top",
        port_hints: ["pin1"],
        points: [
          { x: 4, y: -1 },
          { x: 6, y: -1 },
          { x: 6, y: 1 },
          { x: 4, y: 1 },
        ],
      },
    ] as AnyCircuitElement[],
  )

  const polygonPad = components.find(
    (component): component is SmtPad =>
      component instanceof SmtPad && component._parsedProps.shape === "polygon",
  )

  expect(polygonPad).toBeDefined()
  expect(polygonPad!._parsedProps.pcbX).toBe(5)
  expect(polygonPad!._parsedProps.pcbY).toBe(0)
  expect(polygonPad!._parsedProps.points).toEqual([
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ])
})
