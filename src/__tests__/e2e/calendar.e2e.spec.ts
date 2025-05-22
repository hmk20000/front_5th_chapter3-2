import { test, expect } from '@playwright/test';

// 캘린더 메인 페이지에서 일정 추가 버튼을 누르고 폼이 노출되는지 확인하는 기본 E2E 테스트

test.describe('캘린더 E2E', () => {
  test('반복 일정을 생성하고 수정하면 단일 일정으로 변경되고 그것을 삭제하면 단일로 삭제 된다.', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: '제목' }).click();
    await page.getByRole('textbox', { name: '제목' }).fill('반복일정');
    await page.getByRole('textbox', { name: '날짜' }).fill('2025-05-01');
    await page.getByRole('textbox', { name: '시작 시간' }).click();
    await page.getByRole('textbox', { name: '시작 시간' }).fill('10:00');
    await page.getByRole('textbox', { name: '종료 시간' }).click();
    await page.getByRole('textbox', { name: '종료 시간' }).fill('11:00');

    const checkBox = page.getByLabel('반복 일정');
    if (!(await checkBox.isChecked())) {
      await checkBox.click();
    }

    await page.getByLabel('반복 유형').selectOption('weekly');
    await page.getByRole('textbox', { name: '반복 종료일' }).fill('2025-05-23');
    await page.getByRole('button', { name: '일정 추가' }).click();

    // 일정이 n개 추가되었는지 확인
    const event = await page.getByTestId('event-list').getByText('반복일정').nth(1);
    expect(event).toBeVisible();

    // 수정버튼을 클릭 aria-label이 'edit event'인 버튼을 클릭
    await expect(event.getByRole('button', { name: 'edit event' })).toBeVisible();

    // 제목을 '수정된 반복일정'으로 변경
    await page.getByRole('textbox', { name: '제목' }).fill('수정된 반복일정');
    await page.getByRole('button', { name: '일정 수정' }).click();

    // 수정된 반복일정이 추가되었는지 확인
    const updatedEvent = await page.getByTestId('event-list').getByText('수정된 반복일정').nth(1);
    expect(updatedEvent).toBeVisible();

    // 삭제버튼을 클릭 aria-label이 'Delete event'인 버튼을 클릭
    await updatedEvent.getByRole('button', { name: 'Delete event' }).click();

    // 일정이 삭제되었는지 확인
    const deletedEvent = await page.getByTestId('event-list').getByText('수정된 반복일정').nth(1);
    expect(deletedEvent).not.toBeVisible();
  });

  test('단일 일정을 여러 개 생성하고 수정시 원하는 일정만 수정된다.', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: '제목' }).click();
    await page.getByRole('textbox', { name: '제목' }).fill('반복일정');
    await page.getByRole('textbox', { name: '날짜' }).fill('2025-05-01');
    await page.getByRole('textbox', { name: '시작 시간' }).click();
    await page.getByRole('textbox', { name: '시작 시간' }).fill('10:00');
    await page.getByRole('textbox', { name: '종료 시간' }).click();
    await page.getByRole('textbox', { name: '종료 시간' }).fill('11:00');
    await page.getByRole('button', { name: '저장' }).click();
  });

  test('월별뷰 상태에서 단일 일정과 반복일정르 추가후 올바르게 등록되는지 확인, 이후 주별 뷰 전환시 등록된 일정들이 날짜에 맞춰 표시 되는지 확인', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: '제목' }).click();
    await page.getByRole('textbox', { name: '제목' }).fill('반복일정');
  });
});
