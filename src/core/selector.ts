import * as THREE from "three";
import { SelectionBox } from "three/addons/interactive/SelectionBox.js";
import { MOUSE_LEFT } from "../constants/controls";
import { Scene } from "./scene";

export class Selector {
  private box: SelectionBox;
  private _renderer: THREE.WebGLRenderer;
  private _dom: HTMLElement;
  private _scene: Scene;
  private _camera: THREE.Camera;
  private _isSelecting: boolean = false;
  private _startPoint: THREE.Vector2 = new THREE.Vector2();
  private _selectionBoxElement: HTMLDivElement | null = null;

  private _pointerDown: (event: MouseEvent) => void;
  private _pointerMove: (event: MouseEvent) => void;
  private _pointerUp: (event: MouseEvent) => void;

  constructor(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: Scene, dom: HTMLElement) {
    this._renderer = renderer;
    this._dom = dom;
    this._scene = scene;
    this._camera = camera;
    this.box = new SelectionBox(camera, scene);

    this._pointerDown = this.onPointerDown.bind(this);
    this._pointerMove = this.onPointerMove.bind(this);
    this._pointerUp = this.onPointerUp.bind(this);

    // 선택 박스 DOM 요소 생성
    this._selectionBoxElement = document.createElement("div");
    this._selectionBoxElement.className = "selectBox";
    this._selectionBoxElement.style.cssText = `
      position: absolute;
      border: 1px dashed #00ced6;
      background: rgba(0, 206, 214, 0.1);
      pointer-events: none;
      display: none;
    `;
    this._dom.appendChild(this._selectionBoxElement);
  }

  public onPointerDown(event: MouseEvent) {
    if (event.button === MOUSE_LEFT) {
      this._isSelecting = true;
      const rect = this._renderer.domElement.getBoundingClientRect();

      // 시작점 저장 (단일 클릭인지 드래그인지 판단하기 위해)
      this._startPoint.set(event.clientX, event.clientY);

      // 정규화된 좌표 계산
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.box.startPoint.set(x, y, 0);
      this.box.endPoint.set(x, y, 0);

      // 선택 박스 표시
      if (this._selectionBoxElement) {
        this._selectionBoxElement.style.display = "block";
        this._selectionBoxElement.style.left = `${event.clientX - rect.left}px`;
        this._selectionBoxElement.style.top = `${event.clientY - rect.top}px`;
        this._selectionBoxElement.style.width = "0px";
        this._selectionBoxElement.style.height = "0px";
      }

      this._renderer.domElement.addEventListener("pointermove", this._pointerMove);
      this._renderer.domElement.addEventListener("pointerup", this._pointerUp);
    }
  }

  public onPointerMove(event: MouseEvent) {
    if (this._isSelecting && this._selectionBoxElement) {
      const rect = this._renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.box.endPoint.set(x, y, 0);

      // 선택 박스 크기 업데이트
      const startX = this._startPoint.x - rect.left;
      const startY = this._startPoint.y - rect.top;
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const left = Math.min(startX, currentX);
      const top = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);

      this._selectionBoxElement.style.left = `${left}px`;
      this._selectionBoxElement.style.top = `${top}px`;
      this._selectionBoxElement.style.width = `${width}px`;
      this._selectionBoxElement.style.height = `${height}px`;
    }
  }

  public onPointerUp(event: MouseEvent) {
    if (!this._isSelecting) return;

    event.stopPropagation();
    const rect = this._renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.box.endPoint.set(x, y, 0);

    // 선택 박스 숨기기
    if (this._selectionBoxElement) {
      this._selectionBoxElement.style.display = "none";
    }

    // 드래그 거리 계산 (단일 클릭인지 판단)
    const dragDistance = Math.sqrt(
      Math.pow(event.clientX - this._startPoint.x, 2) +
        Math.pow(event.clientY - this._startPoint.y, 2),
    );

    // 선택된 오브젝트 가져오기
    const selectedObjects = this.box.select();

    // Scene의 selectedObject에 설정
    // 드래그가 아니고 선택된 오브젝트가 없으면 선택 해제
    if (dragDistance < 5 && selectedObjects.length === 0) {
      // 단일 클릭이고 아무것도 선택되지 않았으면 선택 해제
      this._scene.selectedObject = [];
    } else if (selectedObjects.length > 0) {
      // 선택된 오브젝트가 있으면 설정
      // Scene이 아닌 오브젝트만 필터링
      const filteredObjects = selectedObjects.filter(
        (obj) => !(obj instanceof THREE.Scene),
      ) as unknown as THREE.Object3D[];

      this._scene.selectedObject = filteredObjects;
    }

    // 이벤트 리스너 제거
    this._renderer.domElement.removeEventListener("pointermove", this._pointerMove);
    this._renderer.domElement.removeEventListener("pointerup", this._pointerUp);

    this._isSelecting = false;
  }

  public dispose() {
    if (this._selectionBoxElement && this._selectionBoxElement.parentNode) {
      this._selectionBoxElement.parentNode.removeChild(this._selectionBoxElement);
    }
    this._dom.removeEventListener("pointermove", this._pointerMove);
    this._dom.removeEventListener("pointerup", this._pointerUp);
    this._dom.removeEventListener("pointerdown", this._pointerDown);
  }

  public connect() {
    this._dom.addEventListener("pointerdown", (event: MouseEvent) => {
      this._pointerDown(event);
    });
    this._dom.addEventListener("pointermove", (event: MouseEvent) => {
      this._pointerMove(event);
    });
    this._dom.addEventListener("pointerup", (event: MouseEvent) => {
      this._pointerUp(event);
    });
  }

  // public render() {
  //   this._composer.render();
  //   this._composer.renderer.autoClear = true;
  // }
}
